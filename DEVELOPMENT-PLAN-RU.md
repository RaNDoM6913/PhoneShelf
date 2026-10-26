# iPhone Atlas — план разработки

> Рабочее название iPhone Atlas не является утверждённым брендом. Документ описывает будущие работы; репозиторий, приложение, тесты и команды ниже ещё не созданы и не запускались. При исполнении использовать согласованный режим работы и проверять задачи по их критериям, сохраняя подтверждения отдельно от плана.

**Цель:** выпустить полезное нативное macOS-приложение, которое локально исследует резервные копии iPhone, показывает доступные live-данные подключённого телефона и проверяет экспорт выбранных объектов.

**Архитектура:** SwiftUI/AppKit, чистая предметная модель на Swift, изолированные службы транспорта и разбора данных. Кандидат live-backend — libimobiledevice; Python используется только для исследования. Архитектурные решения, границы функций и дизайн находятся в [основном плане](PROJECT-PLAN-RU.md).

**Условие public beta:** одновременно работают offline backup baseline, известный пароль шифрованной копии, raw inventory, generic inspectors, стартовые Messages/Contacts, read-only live-анализ и экспорт. Если одна обязательная линия заблокирована, выпускается честно названная ограниченная alpha с перечисленным составом; статус полной beta ей не присваивается. Прямое удаление для полезности этой beta не требуется.

## Общие ограничения и приёмка

- Обработка содержимого локальная; базовый сценарий не требует сервера, AI, root, профиля управления или Developer Mode. Поддерживаемые macOS/iOS/model combinations выбираются после P0, а не предполагаются заранее.
- Backup — снимок с датой и собственным охватом. Наличие записи не доказывает существование данных на телефоне сейчас; отсутствие не означает нулевой размер или гарантированное удаление.
- Первое чтение исходной копии не должно менять её. Пароли, pairing records, личное содержимое и настоящие пользовательские fixtures не попадают в Git, CI и журналы.
- Все операции привязаны к источнику, устройству/копии, поколению сессии и точному набору объектов. Доступные и неизвестные размеры различаются; пересекающиеся измерения не складываются.
- Экспорт не удаляет оригиналы. Байты, занятые/освобождённые на Mac, и изменение доступного места iPhone показываются отдельно.
- MIT для собственного исходного кода — предварительный выбор до license audit. Исходный код зависимостей и распространяемые binaries проверяются отдельно.

На каждом milestone нужны работающий пользовательский сценарий, релевантные негативные тесты, один компактный набор доказательств и актуальный checkpoint. Сначала воспроизводится реальная ошибка/контракт тестом, затем выполняется минимальная реализация и проверка. Коммит соответствует одной логической задаче; полный обязательный suite запускается на стабильном интегрированном результате.

## Карта владения кодом

Все пути ниже — предлагаемые пути будущего репозитория.

| Путь | Ответственность |
|---|---|
| `packages/AppDomain/` | Идентичности источников, capabilities, измерения, snapshot, artifact/object reference, ошибки и DTO. |
| `packages/BackupCore/` | Обнаружение выбранной копии, envelope/manifest, file mapping, доступ к payload, известный пароль. |
| `packages/ArtifactDecoders/` | Версионированные семантические decoders Messages/Contacts и будущих категорий. |
| `packages/DeviceTransport/` | USB session, сопряжение, native protocol adapters и capabilities. |
| `packages/MediaAccess/` | ImageCaptureCore, каталог ресурсов, связанные объекты и скачивание. |
| `packages/StorageAnalysis/` | Инвентаризация, непересекающиеся агрегаты, сравнение снимков. |
| `packages/Operations/` | Неизменяемые планы, отмена, проверка, журнал и reconciliation. |
| `packages/LocalStore/` | Локальная история, версии схемы, квоты cache и безопасные diagnostics. |
| `packages/ExportKit/` | Проверенный экспорт файлов/отчётов, имена, collision policy, manifest результата. |
| `apps/macOS/` | SwiftUI/AppKit, маршруты, системные диалоги, RU/EN, accessibility. |
| `services/DeviceService/` | Непривилегированный XPC boundary live-backend с allowlist команд. |
| `services/ParserService/` | Изолированный разбор недоверенных plist/SQLite/медиа, лимиты времени и памяти. |
| `tools/atlas-cli/` | Диагностический CLI поверх тех же модулей, без отдельной реализации логики. |
| `tests/fixtures/synthetic/` | Только синтетические копии, БД, media groups и protocol responses. |

`AppDomain` закрепляет модель основного плана: `SourceRef`, `DeviceSession`, `Observation`, `BackupEntry`, `Artifact`, `OperationPlan`, `ItemOutcome`. Концептуальные контракты: `BackupStore.open(selectedLocation, passwordProvider) -> BackupHandle`, `BackupStore.enumerate(handle, filter, cursor) -> Page<BackupEntry>`, `BackupStore.read(entry, range) -> ByteStream`; `ArtifactDecoder.probe(context) -> SupportResult`, `ArtifactDecoder.decode(context) -> Stream<Artifact>`; `DeviceProvider.probe(session) -> CapabilitySnapshot`, `DeviceProvider.observe(session, scopes) -> Stream<Observation>`; `ExportService.export(plan, destinationGrant) -> Stream<ItemOutcome>`; `OperationCoordinator.execute(approvedPlan) -> Stream<ItemOutcome>`. A01 стабилизирует реальные Swift async/error-сигнатуры, одинаковые для UI, XPC и CLI.

## A00 — доказательства, спецификация и допуск

**Зависимости:** отсутствуют. **Владение:** координатор; `docs/architecture/`, `docs/adr/`, `docs/plans/`, `research/`, dependency manifest.

- [ ] Зафиксировать исходный PDF, этот план, перечень обязательного beta scope и запреты; составить capability matrix без выдуманных PASS.
- [ ] Провести аудит выбранных revisions, транзитивных лицензий, notices и способа поставки. Текущий pymobiledevice3 указывает GPL-3.0-or-later; не переносить его в MIT-продукт как будто лицензия отсутствует. [Upstream metadata](https://github.com/doronz88/pymobiledevice3/blob/master/pyproject.toml)
- [ ] Учесть прежние материалы Claude и сверить решения, версии, устройство и результаты, когда они поступят. Пока записать `MISSING`: независимый P0 может идти, но прежние проверки не зачисляются новой реализации.
- [ ] Определить разрешённые тестовые устройства/объекты, копии и допустимые сценарии. Деструктивные опыты получают отдельный допуск.

**Выход:** source-bound specification, список открытых вопросов и принятие только следующего инженерного пакета; публикация и удаление не считаются автоматически разрешёнными этим документом.

## A01 — оболочка и общие контракты

**Зависимости:** A00. **Пути:** `Package.swift`, `packages/AppDomain/`, `packages/LocalStore/`, `apps/macOS/`, `tools/atlas-cli/`, `tests/Unit/AppDomainTests/`.

- [ ] Создать модульную сборку, типы идентичности/измерений/capabilities и маршрутизатор. Живые данные, backup и mock data имеют различимые источники.
- [ ] Реализовать десять маршрутов: welcome, overview, apps, documents, media, backups library, backup detail, comparison, operations, settings. У backup detail есть categories/all-files/info; это подвиды одного маршрута.
- [ ] Связать состояния loading/partial/empty/locked/unsupported/error/cancelled с единым контрактом, подготовить RU/EN, keyboard navigation, VoiceOver и светлую/тёмную темы.
- [ ] Проверить unknown ≠ zero, stale snapshot, изоляцию источников, восстановление навигации и отсутствие активных destructive-кнопок.

**Выход:** собираемая native shell с синтетическими сценариями и CLI contract; интерфейс сам по себе не доказывает работоспособность устройства или backup.

## B01 — envelope нешифрованной копии

**Зависимости:** A01. **Пути:** `packages/BackupCore/Envelope/`, `Manifest/`, `Payload/`, `tests/Unit/BackupCoreTests/`, synthetic backup fixtures.

- [ ] Открывать выбранную пользователем папку и разбирать Info/Status/Manifest metadata, определяя дату, устройство, завершённость, формат и encryption status.
- [ ] Построить raw inventory из поддержанного manifest и проверять mapping записей к payload; различать missing payload, unsupported schema и incomplete backup.
- [ ] Считать логический размер, доступность и происхождение каждого значения; не объявлять сумму доступных файлов всей занятой памятью iPhone.
- [ ] Проверить truncated plist/SQLite, отсутствующий manifest, Unicode, duplicate names, symlink/path traversal, коллизии разных domain/path и отмену большого scan.

**Выход:** CLI и экран показывают синтетическую/разрешённую нешифрованную копию, all-files и info; исходная папка остаётся неизменной, что подтверждается контрольным inventory до/после.

## B02 — шифрованная копия с известным паролем

**Зависимости:** B01. **Пути:** `packages/BackupCore/Crypto/`, `CredentialHandling/`, `tests/Unit/BackupCryptoTests/`.

- [ ] Выбрать и проверить реализацию keybag/manifest/file decryption для конкретных поддерживаемых backup versions; закрепить алгоритмы и зависимости, не писать собственную криптографию без обоснования.
- [ ] Добавить запрос известного пароля, ограниченное время жизни секрета и необязательное сохранение в Keychain. Подбор/снятие пароля не входят в scope.
- [ ] Различать неверный пароль, повреждение, неподдержанный формат и отсутствие нужного ключа; не выдавать частично расшифрованные данные за исправные.
- [ ] Проверить правильный/неправильный пароль, пустой пароль, damaged encrypted file, cancel, перезапуск parser и отсутствие секрета в diagnostics.

**Выход:** один и тот же поддержанный backup открывается и экспортирует контрольные payload с ожидаемым содержимым; plaintext temporary data имеют ограниченную область и очищаются согласно политике.

## B03 — generic inspectors и экспорт

**Зависимости:** B01, B02; для интеграции экспорта — O01. **Пути:** `packages/ExportKit/`, `services/ParserService/`, `apps/macOS/AtlasApp/Features/Backups/`, `tests/Unit/InspectorTests/`.

- [ ] Добавить безопасные views для metadata, текста, plist, SQLite schema/table и поддержанных media; неизвестный формат остаётся raw artifact с причиной.
- [ ] Разбирать SQLite с учётом согласованного комплекта DB+WAL+SHM на отдельной рабочей копии/безопасном read-only пути; preview не выполняет SQL пользователя, скрипты или внешние ссылки автоматически.
- [ ] Экспортировать выбранные файлы в выбранную папку через temporary output, проверки результата и collision policy; отчёт содержит source identity, дату снимка и item outcomes.
- [ ] Проверить oversized/recursive plist, повреждённую БД, DB+WAL+SHM, BLOB, HTML/script content, нехватку места, прерывание, existing names и запрет выхода из destination. При изменении mutable source во время чтения инвалидировать revision/результат; проверить это отдельным тестом.

**Выход:** raw inventory полезен независимо от семантических decoders; выборочный экспорт имеет проверяемый receipt и честные partial errors.

## B04 — стартовые Messages и Contacts

**Зависимости:** B03. **Пути:** `packages/ArtifactDecoders/Messages/`, `Contacts/`, `apps/macOS/AtlasApp/Features/Backups/`, `tests/Unit/ArtifactDecoderTests/`.

- [ ] Определить поддержанные schema variants и атрибуты discovery, затем реализовать сообщения/диалоги/доступные вложения и карточки контактов с полями/группировкой.
- [ ] Каждое отображаемое поле связывать с исходной записью; сохранять raw fallback, unknown values и неподдержанные записи. Не восстанавливать отсутствующее содержание догадкой.
- [ ] Явно показывать backup date, источник timestamps/time zone, отсутствующие attachments, частичное декодирование и ограничения полноты.
- [ ] Проверить несколько schema fixtures, rich/unknown message payload, missing attachment, одинаковые имена контактов, несколько телефонов/email, international text и malformed database.

**Выход:** обе категории работают в нешифрованной и поддержанной шифрованной копии, имеют поиск/preview/экспорт и доказанную деградацию в generic view. Это обязательная часть public beta; Notes и остальные категории её не подменяют.

## D01 — native probe и USB session

**Зависимости:** A01, license decision A00. **Пути:** `packages/DeviceTransport/Session/`, `services/DeviceService/`, `tools/atlas-cli/`, `tests/Unit/DeviceSessionTests/`.

- [ ] Собрать libimobiledevice candidate и интегрировать минимальные discovery/pairing/readiness/probe, используя системный usbmuxd macOS.
- [ ] Возвращать версии backend/OS build, source capabilities, причины отказа и новое session generation после reconnect; не идентифицировать телефон по имени.
- [ ] Проверить sandbox/XPC доступ без root-helper и зафиксировать необходимые entitlements; недоступный capability не блокирует независимые источники.
- [ ] Проверить locked/untrusted device, отказ доверия, два телефона, отключение во время probe, перезапуск helper и late response старого generation.

**Выход:** read-only JSON и UI connection state подтверждены на разрешённом физическом устройстве; fixture-only результат не принимается как USB PASS.

## D02 — метрики, документы и crash reports

**Зависимости:** D01; экспорт использует O01. **Пути:** `packages/DeviceTransport/Adapters/`, `packages/StorageAnalysis/Live/`, `apps/macOS/AtlasApp/Features/Applications/`, `apps/macOS/AtlasApp/Features/Documents/`.

- [ ] Подключить доступные capacity/app measurements с сохранением исходных ключей; отдельно проверить семантику static/dynamic sizes сравнением с Settings/Finder.
- [ ] Добавить разрешённый File Sharing через явный Documents scope, listing и export; не полагаться на default VendContainer.
- [ ] Читать/экспортировать доступные crash reports без удаления. `keep/erase=false` задаётся явно; mover/flush не запускается незаметно как будто это чистое чтение.
- [ ] Проверить absent/partial sizes, rejected app, source-file changes, Unicode/path traversal, export interruption и полноту crash output независимо от успеха процесса.

**Выход:** apps/documents/overview показывают фактически доступный охват; документы и отчёты экспортируются, ничего на телефоне не удаляется.

## D03 — media catalog и полный экспорт объекта

**Зависимости:** D01, O01. **Пути:** `packages/MediaAccess/`, `apps/macOS/AtlasApp/Features/Media/`, `tests/Unit/MediaAccessTests/`.

- [ ] Подключить ImageCaptureCore и доказать соответствие media-device выбранному USB-device; неоднозначная привязка не допускает операций.
- [ ] Представлять Live Photo/RAW+JPEG/sidecars группой ресурсов, получать sizes/metadata/thumbnails и явно показывать недоступные originals.
- [ ] Экспортировать весь утверждённый состав группы и подтверждать комплектность; handles не переживают reconnect.
- [ ] Проверить iCloud on/off и optimization, locked Hidden album, HEIC/HEVC/RAW, partial group, camera lock, disconnect и недостаток места на Mac.

**Выход:** физически проверенный media export и source coverage; capability delete остаётся диагностикой. [Apple ImageCaptureCore](https://developer.apple.com/documentation/imagecapturecore)

## C01 — сравнение снимков

**Зависимости:** B03, D02; D03 для media comparison. **Пути:** `packages/StorageAnalysis/Comparison/`, `apps/macOS/AtlasApp/Features/Comparison/`, `tests/Unit/ComparisonTests/`.

- [ ] В beta сравнивать файлы совместимых источников и kinds наблюдений, показывая даты, scope, freshness и состояния added/absent in second/changed/unknown. «Отсутствует во втором снимке» не означает «удалено с телефона».
- [ ] Не выводить «освобождено на iPhone» из удаления backup или разницы двух неполных каталогов; changed coverage получает предупреждение сопоставимости.
- [ ] Проверить одинаковые имена разных объектов, rename, missing field, changed unit, unmatched device и time zone.

**Выход:** понятная проверка результата действий пользователя и роста данных без ложной причинной связи.

## O01 — двигатель безопасных операций

**Зависимости:** A01; интеграции по мере B03/D02/D03. **Пути:** `packages/Operations/`, `packages/LocalStore/Journal/`, `apps/macOS/AtlasApp/Features/Operations/`, `tests/Unit/OperationTests/`.

- [ ] Реализовать immutable plan, selection digest, preconditions, progress/cancel, item receipts и durable journal. Для beta допустимые команды — чтение и экспорт.
- [ ] Состояния: planned → executing → verifying → completed/partial/needsAttention; reconnect ведёт через reconciling. Sent-but-no-response означает outcomeUnknown.
- [ ] Запретить late callback старой операции менять новую selection; повторять чтение ограниченно, экспорт возобновлять только с доказанной идентичностью.
- [ ] Проверить crash после intent/после отправки/до receipt, cancel и partial destination; неизвестный результат никогда не превращается автоматически в PASS.

**Выход:** общая безопасная основа всех export workflows и экран операций с достоверным результатом каждого объекта.

## O02 — отдельный допуск удаления

**Зависимости:** O01 и принятый capability конкретного источника. **Пути:** `packages/Operations/DeleteAdmission/`, нужный adapter, destructive device-lab fixtures.

- [ ] Сначала доказать identity, актуальность, границы действия, поведение iCloud/Recently Deleted и recoverability; затем согласовать точный destructive scope.
- [ ] Разрешать только просмотренный набор, после отдельного подтверждения и проверенного экспорта, где он требуется. Disconnect требует reconciliation, автоматический повтор запрещён.
- [ ] Исследовать внешнюю race path-delete: re-stat по размеру/mtime не является atomic compare-and-delete при замене файла приложением iPhone. Пока контракт нельзя защитить, соответствующее удаление выключено.
- [ ] Проверить unselected sentinels, concurrent replacement, новые children каталога, denied delete и неизвестный ответ на настоящем тестовом устройстве.

**Выход:** отдельный go/no-go каждой операции. Блокировка O02 не блокирует read-only beta и не ослабляет её критерии.

## R01 — публичная поставка

**Зависимости:** A00–A01, B01–B04, D01–D03, C01, O01. O02 необязателен. **Пути:** `.github/workflows/`, `docs/maintainers/`, `LICENSE`, `THIRD_PARTY_NOTICES.md`, release packaging.

- [ ] Интегрировать все десять маршрутов, empty/error/help states, RU/EN и accessibility; проверить реальный onboarding обычным пользователем.
- [ ] Завершить license/source packaging, dependency pins/SBOM и build instructions; подписать вложенный код, Hardened Runtime, notarization/staple.
- [ ] Провести clean-install/Gatekeeper acceptance на заявленных системах и полный обязательный suite; проверить отсутствие содержимого/секретов в diagnostics.
- [ ] Сопоставить beta checklist с evidence. При незакрытой обязательной линии выпустить только точно описанную alpha или оставить release заблокированным.

**Выход:** проверяемая поставка с capability matrix, known limitations и receipt публикации после отдельного разрешения на публикацию. Notarization не заменяет функциональную проверку. [Apple distribution](https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution)

## Планируемые команды проверки

Эти команды и названия targets/test plans **предлагаются**; A01 должен создать соответствующие схемы. Здесь нет результатов их выполнения.

```sh
swift build
swift test --filter AppDomainTests
swift test --filter BackupCoreTests
swift test --filter BackupCryptoTests
swift test --filter ArtifactDecoderTests
swift test --filter OperationTests
xcodebuild -project apps/macOS/Atlas.xcodeproj -scheme Atlas -destination 'platform=macOS' -testPlan AtlasOffline test
xcodebuild -project apps/macOS/Atlas.xcodeproj -scheme Atlas -destination 'platform=macOS' -testPlan AtlasDeviceLab test
```

`AtlasOffline` проверяет UI и offline flows; `AtlasDeviceLab` запускается только в подготовленной физической лаборатории и в beta не содержит удаления. Полный `swift test` и согласованные Xcode lanes выполняются один раз на стабильной интеграции. Для release отдельно запланированы `codesign --verify`, Gatekeeper assessment и ticket validation над фактическим артефактом; аргументы закрепляются упаковкой R01.

## Распределение и критический путь

Координатор владеет AppDomain, общими контрактами, integration, git state и финальным acceptance. Не более двух обычных Sol workers одновременно, с чистым контекстом и непересекающимися путями: первый — BackupCore/ArtifactDecoders/ParserService, второй — DeviceTransport/MediaAccess/DeviceService. Общие ExportKit/Operations и UI либо принадлежат координатору, либо явно передаются одному исполнителю после стабилизации интерфейса. Рабочее направление не меняет фактическую модель уже запущенной сессии; её проверяют доступной runtime telemetry.

После A00/A01 параллельны backup-линия B01→B02→B03→B04 и live-линия D01→D02/D03. O01 создаётся рано, затем интегрируется с экспортами; C01 следует после совместимых snapshots. R01 ждёт обе обязательные линии, общей проверки и distribution acceptance. O02 идёт отдельно. При meaningful behavior milestone проводится одна независимая проверка интегрированного scope; повторяется только изменившаяся рискованная часть. Сроки оценивать после native probe, encrypted-backup proof и semantic schema proof; календарная дата сейчас не обоснована.

## E01+ — следующие версии

- [ ] **E01 / v0.2:** семантическое сравнение артефактов, Notes, Safari и calls как отдельные decoder packages с собственными schema fixtures, privacy review и fallback; не считать их готовыми из факта наличия SQLite viewer.
- [ ] **E02:** Health и другие чувствительные/сложные категории — отдельная спецификация доступа, полноты и допустимого экспорта.
- [ ] **E03:** Intel, Wi-Fi, несколько устройств, app uninstall, создание backup и расширенная автоматизация — отдельные admission/compatibility decisions.

Один текущий checkpoint перечисляет принятые capabilities, evidence, blockers и следующий конкретный пакет. Пока исторические материалы Claude отсутствуют, это явно сохраняется в нём; при получении проводится reconciliation, а не перезапись истории подтверждёнными сегодняшними результатами.

# PhoneShelf: iPhone components, suppliers and functional checks

2026-10-26. **Documentation/upstream source inspection only.** No device/backup access, install, pairing, diagnostic session or hardware test was performed. This adds focused research to the [2026-10-23 baseline](../2026-10-23/DEVICE-RESEARCH.md).

## Conclusion

A useful detailed dossier can combine USB observations, reference specifications, optional iOS tests and official/user evidence. The inspected sources do not establish a universal ordinary-USB route for every fitted supplier/module serial, complete repair history, calibration status or authenticity.

An iOS hardware app does not establish equivalent Mac USB access. Public frameworks execute in the phone app; calling them on a Mac does not proxy them to the attached phone. A hardware-info screen may also use a model/specification lookup. [Apple platform guidance](https://developer.apple.com/documentation/apple-silicon/adapting-ios-code-to-run-in-the-macos-environment).

## Pinned upstream evidence

| Project | Revision | Role |
| --- | --- | --- |
| libimobiledevice | `fa0f79190142bc309307967c058f89c1b36eb6b8` | Preferred native transport candidate; no production dependency admitted. |
| pymobiledevice3 | `e59349a17df4f72449a9a8d380119e370cbf5013` | Protocol research reference, not a second bundled backend. |
| Apple XNU | `f6217f891ac0bb64f3d375211650a4c1ff8ca1ea` | Generic power-property semantics, not modern iPhone exposure proof. |

Apple support pages are dated research references. Recheck model/OS/region requirements at implementation.

## Ordinary USB: concrete mechanisms

[Lockdown GetValue](https://github.com/libimobiledevice/libimobiledevice/blob/fa0f79190142bc309307967c058f89c1b36eb6b8/src/lockdown.c#L403-L449) accepts domain/key queries. [Diagnostics Relay](https://github.com/libimobiledevice/libimobiledevice/blob/fa0f79190142bc309307967c058f89c1b36eb6b8/src/diagnostics_relay.c#L290-L450) implements diagnostic requests, IORegistry entry-name/class lookup and selected planes. A client request in source proves format, not success on an arbitrary current iPhone.

| Area | Candidate route | Boundary |
| --- | --- | --- |
| Device/board | Returned Lockdown model/hardware/software/build/baseband/identifier fields; [current HardwareModel consumer](https://github.com/doronz88/pymobiledevice3/blob/e59349a17df4f72449a9a8d380119e370cbf5013/pymobiledevice3/restore/device.py#L74-L85). | A platform code does not inventory every fitted part. |
| Basic power | `com.apple.mobile.battery`, listed in [native source](https://github.com/libimobiledevice/libimobiledevice/blob/fa0f79190142bc309307967c058f89c1b36eb6b8/tools/ideviceinfo.c#L45-L49). | No universal current schema is established. |
| Detailed batteries | IORegistry class `IOPMPowerSource`; [current battery helper](https://github.com/doronz88/pymobiledevice3/blob/e59349a17df4f72449a9a8d380119e370cbf5013/pymobiledevice3/services/diagnostics.py#L1085-L1094); optional GasGauge comparison. | Validate available fields, units, cardinality and Settings correspondence on each supported configuration. |
| Battery maker/identity | Preserve returned Manufacturer, ManufactureDate, Model, Serial, CycleCount and power/capacity properties. [Apple definitions](https://github.com/apple-oss-distributions/xnu/blob/f6217f891ac0bb64f3d375211650a4c1ff8ca1ea/iokit/IOKit/pwr_mgt/IOPMPowerSource.h#L96-L162). | Generic Serial means manufacturer serial/unique information and explicitly does not correlate with Apple's printed battery serial. No assumed modern exposure or unvalidated code-to-OEM decoding. |
| NAND/storage | `com.apple.disk_usage`, `com.apple.disk_usage.factory`; [native request types](https://github.com/libimobiledevice/libimobiledevice/blob/fa0f79190142bc309307967c058f89c1b36eb6b8/include/libimobiledevice/diagnostics_relay.h#L53-L56) include NAND. | Capacity/free space do not identify NAND vendor; modern supplier/serial/wear fields remain unproven. |
| Wi-Fi | Entry AppleBCMWLANSkywalkInterface, fallback class IO80211Interface; [current lookup](https://github.com/doronz88/pymobiledevice3/blob/e59349a17df4f72449a9a8d380119e370cbf5013/pymobiledevice3/services/diagnostics.py#L1096-L1109). | No universal chipset/vendor schema; MAC addresses are not supplier proof. |
| SoC/RAM/radios/ports | Budgeted IODeviceTree/IOService snapshots; [current plane support](https://github.com/doronz88/pymobiledevice3/blob/e59349a17df4f72449a9a8d380119e370cbf5013/pymobiledevice3/services/diagnostics.py#L1051-L1083); index returned node paths/classes/properties. | No complete current RAM/NAND/modem/NFC/UWB/controller supplier or module-serial mapping was established. |
| Display/cameras | Candidate returned registry fields and legacy MobileGestalt panel/screen/camera-module keys. | [Current implementation](https://github.com/doronz88/pymobiledevice3/blob/e59349a17df4f72449a9a8d380119e370cbf5013/pymobiledevice3/services/diagnostics.py#L947-L995) explicitly handles MobileGestaltDeprecated on iOS 17.4+. Old key lists do not establish a modern route. |
| Repair/calibration | User-provided official history. | No ordinary-USB history/calibration API established. |

Returned serial bytes are an observation, not proof of factory origin, genuine parts or completed calibration. A teardown/model catalogue describes possible suppliers, not this unit. Keep Apple brand, component OEM, assembler, assembly country, region SKU and manufacture date separate.

Diagnostics libraries also contain mutating actions. Admit only explicit read calls; pairing/trust, restart/sleep/shutdown and log removal are separate. Initial acquisition budgets and acceptance are in [the plan](../../docs/PRODUCT-PLAN.md).

## What an optional iOS companion adds

| Capability | Public app route | Limit |
| --- | --- | --- |
| Basic identity/power | [UIDevice](https://developer.apple.com/documentation/uikit/uidevice), [model](https://developer.apple.com/documentation/uikit/uidevice/model), [battery monitoring](https://developer.apple.com/documentation/uikit/uidevice/isbatterymonitoringenabled). | Model may be just iPhone; platform-code lookup gives reference specifications, not fitted suppliers. |
| Cameras | AVFoundation discovery, formats, FPS/resolution, supported focus/HDR/depth and consented capture. | [manufacturer](https://developer.apple.com/documentation/avfoundation/avcapturedevice/manufacturer) returns Apple Inc. for Apple capture devices, not sensor OEM. [modelID](https://developer.apple.com/documentation/avfoundation/avcapturedevice/modelid) and [uniqueID](https://developer.apple.com/documentation/avfoundation/avcapturedevice/uniqueid) are not physical-module authenticity certificates. |
| Motion/proximity | [Core Motion](https://developer.apple.com/documentation/coremotion/cmmotionmanager), supported proximity observations and [motion privacy](https://developer.apple.com/documentation/bundleresources/information-property-list/nsmotionusagedescription). | Availability/permissions apply; readings do not certify full calibration/physical condition. |
| Location/network | [Authorized location](https://developer.apple.com/documentation/corelocation/requesting-authorization-to-use-location-services), [network-path observations](https://developer.apple.com/documentation/network/nwpathmonitor) and controlled connectivity probes. | A fix combines sources and does not isolate GPS hardware; [general-purpose Wi-Fi scanning is unavailable](https://developer.apple.com/documentation/technotes/tn3111-ios-wifi-api-overview). |
| Biometrics | User-present [LAContext](https://developer.apple.com/documentation/localauthentication/lacontext) availability/authentication. | No templates or full TrueDepth/Touch ID certificate. |
| Functional media/tests | [Camera/microphone authorization](https://developer.apple.com/documentation/avfoundation/requesting-authorization-to-capture-and-save-media); interactive display/touch/audio/haptic checks. | Permissions, user observation and test conditions matter. Denial is not broken hardware. |

[Apple DTS](https://developer.apple.com/forums/thread/801521) states ordinary iOS apps cannot programmatically obtain even the device serial, including supervised apps; MDM may retrieve it through a separate management channel. Managed [battery-health status](https://developer.apple.com/documentation/devicemanagement/statusdevicebatteryhealth) also exists, but is not a normal app or USB entitlement.

No reviewed public app API establishes complete display/camera/NAND/battery OEM-and-serial enumeration. Native-app execution and USB service access are distinct channels.

## Apple evidence and official handoffs

[Parts and Service History](https://support.apple.com/en-us/102658) is model-dependent on iOS 15.2+. Preserve exact Genuine, Used, Unknown, Unverified and Finish Repair status meanings. Unknown can indicate malfunction, incomplete linking or modification as well as nongenuine parts. Only the most recent service for a repeatedly serviced part may appear. Model coverage must follow the current table.

[Apple battery information](https://support.apple.com/en-us/106348) documents user-visible health/cycles/dates on eligible models/OS versions. It does not establish USB access. Keep multiple batteries/components representable. Raw capacity ratios must not silently become Apple's health assessment.

[Repair Assistant](https://support.apple.com/en-us/120579) installs calibration data for supported repairs, with model/part/OS/Wi-Fi/battery and possible donor-part activation-lock constraints. [Self Service Repair](https://support.apple.com/self-service-repair) and System Configuration are Apple workflows; no public PhoneShelf calibration endpoint is established.

[Diagnostics requirements](https://support.apple.com/en-us/101965) distinguish on-device Diagnostics for Repair on eligible iPhone 12+/iOS 18+ from browser-console Self Service Repair diagnostics on eligible iPhone 12+/iOS 17+, using another browser device, Wi-Fi and physical diagnostics-mode steps. The [Recovery Assistant entry](https://support.apple.com/en-us/101944) separately documents eligible iPhone 14+ devices. Do not transfer one route's requirement to all routes.

Suites can include MRI, pixels, Multi-Touch, camera quality and Face ID with model-dependent coverage. Beta OS and regional availability are separate constraints. Apple documents [European expansion](https://www.apple.com/newsroom/2024/06/apple-expands-self-service-repair-diagnostics-support-to-europe/) and [Canada](https://www.apple.com/ca/newsroom/2025/08/apple-expands-two-of-its-repair-programs-to-canada/); availability in Belarus was not established.

## Functional-check coverage to design

| Group | Proposed method | Result boundary |
| --- | --- | --- |
| Display | Solid colors/brightness patterns, user inspection, eligible official pixel tests. | Defects observed under the stated conditions. |
| Touch | Full-surface trace and supported multi-touch exercise. | Tested regions/gestures and observed gaps; no all-condition guarantee. |
| Cameras | Each available lens; near/far focus, preview/capture, test chart, optional flash. | Working modes and observed defects, not factory origin or supplier. |
| Audio | Consented microphone capture, playback, user-observed speaker/earpiece routes. | Selected route, environment and observer limitations. |
| Biometrics/sensors | Authentication and motion/orientation/proximity/location exercises. | Specific observations with prerequisites; denied/inconclusive remains distinct. |
| Controls/haptics | User-confirmed buttons/switches, supported haptic output, physical inspection. | No unrestricted button-monitoring or physical-integrity claim. |
| Connectivity | Controlled Wi-Fi/cellular/Bluetooth probes where accessible; consent for external traffic. | Selected operation, not every RF band, NFC or UWB function. |
| Charge/storage | Supported power telemetry, charging behavior and storage reports. | No battery refurbishment, NAND-wear or water-damage certification. |

Each test needs a purpose, duration, abort behavior and postcondition. Do not admit arbitrary stress/drain/write tests by calling them diagnostics.

## Report contract and next evidence

Each observation retains source/device/session identity, component kind/instance, raw property path, typed raw value and units, validated normalization, times, adapter/schema/interpretation revision, availability/reason and evidence class. Distinguish device-reported, model-reference, app-observed, user-confirmed and official-result-imported data; retain conflicts rather than overwriting them.

Each check retains profile/version/method, prerequisites and participation; outcomes are passed, observed issue, inconclusive, skipped, unavailable and untested. Feature maturity remains separately documented/fixture-verified/device-lab-verified/release-verified. Coverage names its applicable denominator.

Redact identifiers/content in shared reports by default. A companion may sign bytes with [CryptoKit](https://developer.apple.com/documentation/cryptokit/p256/signing) and [share them](https://developer.apple.com/documentation/uikit/uiactivityviewcontroller/). A trusted key protects integrity, not truth or genuine parts. [App Attest](https://developer.apple.com/documentation/devicecheck/establishing-your-app-s-integrity) attests an app instance, not complete hardware authenticity.

Next: complete the existing fixture-based shared core; admit a small native USB query list; test one explicitly selected phone against Settings/known observations, including missing/locked/disconnected outcomes; build a versioned property catalogue from actual evidence. Evaluate companion/distribution and official evidence separately. No full supplier inventory, hidden-repair detection or complete physical-condition guarantee has passed acceptance.

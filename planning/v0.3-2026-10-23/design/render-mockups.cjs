/* Render the synthetic design prototype. No phone or personal source is accessed.
   node render-mockups.cjs /absolute/path/to/chromium [output-directory] */
const {chromium}=require('playwright');
const fs=require('node:fs/promises');
const path=require('node:path');
const {pathToFileURL}=require('node:url');

(async()=>{
  const output=path.resolve(process.argv[3]||path.join(__dirname,'mockups'));
  await fs.mkdir(output,{recursive:true});
  const browser=await chromium.launch({headless:true,executablePath:process.argv[2]||process.env.ATLAS_BROWSER_EXECUTABLE});
  const page=await browser.newPage({viewport:{width:1536,height:1024},deviceScaleFactor:1});
  const errors=[];const requests=[];const shots=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('request',r=>{if(/^https?:/.test(r.url())) requests.push(r.url());});
  const base=pathToFileURL(path.join(__dirname,'PROTOTYPE.html')).href;
  const routes=['overview','apps','storage','documents','media','backups','explorer','messages','contacts','privacy','timeline','battery','transfer','toolbox','operations','settings'];
  async function capture(name,route,query='',prepare){
    await page.goto(base+'?capture='+encodeURIComponent(name)+(query?'&'+query:'')+'#'+route);
    await page.evaluate(()=>document.fonts.ready);
    if(prepare)await prepare();
    await page.screenshot({path:path.join(output,name+'.png')});
    const layout=await page.evaluate(()=>({width:innerWidth,height:innerHeight,documentWidth:document.documentElement.scrollWidth,routeTitle:document.querySelector('#content h1')?.textContent,contentHeight:document.querySelector('#content')?.scrollHeight}));
    if(layout.documentWidth>layout.width)throw new Error('Document overflow: '+name);
    shots.push({file:name+'.png',route,query,...layout});
  }
  try{
    for(let i=0;i<routes.length;i++)await capture(String(i+1).padStart(2,'0')+'-'+routes[i],routes[i]);
    await capture('17-apps-dark','apps','theme=dark&mode=advanced');
    await capture('18-explorer-dark','explorer','theme=dark&mode=advanced');
    await capture('19-source-inspector','apps','mode=advanced',async()=>page.locator('#content [data-source="live"]').first().click());
    await capture('20-export-review','documents','',async()=>{await page.locator('[data-export="documents"]').click();await page.locator('[data-action="confirm-export"]').click();});
    await capture('21-disconnected','documents','state=disconnected');
    await capture('22-password-required','backups','',async()=>page.getByRole('button',{name:'Password state'}).click());
    await page.setViewportSize({width:1280,height:900});
    await page.goto(base+'?capture=layout-check#apps');
    const fits=await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth);
    if(!fits)throw new Error('1280px document overflow');
    if(errors.length||requests.length)throw new Error(JSON.stringify({errors,requests}));
    await fs.writeFile(path.join(output,'MANIFEST.json'),JSON.stringify({scope:'Rendered synthetic HTML prototype; not native app screenshots or device tests',status:'passed',screenshots:shots,checks:{javascriptErrors:errors,externalRequests:requests,viewport1280Fits:fits}},null,2)+'\n');
    console.log(JSON.stringify({status:'passed',screenshots:shots.length,output}));
  }finally{await browser.close();}
})().catch(e=>{console.error(e.stack);process.exitCode=1;});

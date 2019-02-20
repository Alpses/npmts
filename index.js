const Koa = require('koa');
const app = new Koa ;

app.use( async(ctx) => {console.log(ctx)
    if(ctx.url === '/' && ctx.method == 'GET'){
        let html = `
            <h2>This is a Demo2</h2>
            <form method="POST" action="/">
                <p>UserName:</p>
                <input name="username">
                <p>UserAge:</p>
                <input name="age">
                <p>Website:</p>
                <input name="website">
                <button type="submit">Submit</button>
            </form>
        ` ;
        ctx.body = html ;
    }else if(ctx.url === '/' && ctx.method == 'POST'){
        let postData = await parsePostDate(ctx);
        ctx.body = postData ;
    }else{
        ctx.body = `<h2>404</h2>` ;
    }
})

const parsePostDate = (ctx)=>{
    return new Promise((resolve,reject)=>{
        try {
            let postData = "" ;
            ctx.req.on('data',(data)=>{
                postData += data ;
            })
            ctx.req.addListener('end',()=>{
                let parseData = parseQuesyStr(postData);
                resolve(parseData);
            })
        }catch(err){
            reject(err);
        }
    })
}
const parseQuesyStr = (qyS)=>{
    const queryData={} ;
    const queryStrList = qyS.split('&');
    console.log(queryStrList)
    for(let [index,qyS] of queryStrList.entries()){
        let itemList = qyS.split('=');
        console.log(itemList);
        queryData[itemList[0]] = decodeURIComponent(itemList[1])
    }
    return queryData ;
}
app.listen(1998,()=>{
    console.log('demo2 in run');
})
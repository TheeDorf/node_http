const http = require("http");
const PORT = 3000

http.createServer((req,res)=>{
    const url = req.url;
    const method = req.method;
    res.setHeader("content-type", "text/html");
        console.log(`request method used ${method}`);

    const chunks = [];

    req.on('data', (chunk)=> {
        console.log(`chunk is: ${chunk}`);
        chunks.push(chunk)
    })

    req.on('end',()=>{
        const body = JSON.parse(Buffer.concat(chunks).toString());
        const responseBody = { method, url, body}
    if(method == 'POST'){
        
        if ( url == "/"){
            req.statusCode = 202;
            res.write("<h1>Wild Card</h1>");
            res.write(JSON.stringify(responseBody));
            console.log("home route");
            
        } else{
            req.statusCode = 404;
            res.write("<h1>page not found</h1>")
            console.log("error route")
            
        }
        res.end()
    }   
    });

    if (url =="/about"){
        req.statusCode = 202;
        res.write("My name is AJ and I am not a backend fan")
       res.end()
    } else if (url == "/echo"){
        req.statusCode = 206;
        res.write("this page is working fine but only has a little content ");
        res.write(JSON.stringify(responseBody));

        res.end()
    }

    })

    

    
    
    
    .listen(PORT,()=>{
    console.log(`server is listening at local host ${PORT} port`)
})
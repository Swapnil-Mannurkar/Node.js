const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // console.log(req);
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head>");
    res.write("<title>Enter message</title>");
    res.write("</head>");
    res.write("<body>");
    res.write("<form action='/message' method='POST'>");
    res.write("<input type='text' name='message'/>");
    res.write("<button type='submit'>Send</button>");
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head>");
  res.write("<title>NODE JS COURSE</title>");
  res.write("</head>");
  res.write("<body>");
  res.write("<h1>Hello from custom Node.js server!</h1>");
  res.write("</body>");
  res.write("</html>");
  res.end();

  // process.exit();
});

server.listen(3000);

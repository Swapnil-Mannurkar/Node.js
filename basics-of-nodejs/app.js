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
    res.write(
      "<form action='/message' method='POST'><input type='text' name='message'/><button>Send</button></form>"
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    fs.writeFileSync("message.txt", "DUMMY");
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
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

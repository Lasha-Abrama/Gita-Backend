// 1) წინასწარ შექმენით შემდეგი ტიპის ფოლდერები:
// /Task12
//    test/
//        main.txt
//     test2/
//         main.txt
//     main.js
//      second.txt
// და ჩაწერეთ შიგნით რენდომ ტექსტი თითოეულში თქვენი მიზანია დაწეროთ ფუნცქია რომელიც წაიკითხავს რეკურსიულად ყველა .txt გაფარტოების ფაილს და დაგილოგავთ სულ რამდენი სიტყვაა ყველა ფაილში ერთად, პლუს რამდენი, ხმოვანი.

const fs = require("fs/promises");
const path = require("path");

async function main(filePath) {
  const dirs = await fs.readdir(filePath);

  let wordsAmount = 0;
  let vowelsAmount = 0;

  for (const dir of dirs) {
    // console.log(dir);
    const fullDirPath = path.join(filePath, dir);
    const stat = await fs.stat(fullDirPath);
    // console.log(stat);
    if (stat.isDirectory()) {
      const result = await main(fullDirPath);

      wordsAmount += result.words;
      vowelsAmount += result.vowels;
    }
    const ext = path.extname(fullDirPath);

    if (ext === ".txt") {
      const readData = await fs.readFile(fullDirPath, "utf-8");
      const words = readData.trim() ? readData.trim().split(/\s+/) : [];
      const chars = readData.replace(/\s/g, "");
      const matches = chars.match(/[aeiou]/gi);
      const vowels = matches ? matches.length : 0;

      wordsAmount += words.length;
      vowelsAmount += vowels;
    }
  }

  return {
    words: wordsAmount,
    vowels: vowelsAmount,
  };
}

// main(__dirname).then(console.log);

// 2) შექმენით სერვერი რომელიც უპასუხებს შემდეგი ტიპის რექუესთებს:
// GET  /about დააბრუნეთ რაიმე ტიპის ინფორმაცია მაგალითად, სახელი, გვარი, ჰობი და ა.შ

// GET /players უნდა დააბრუნოს მაისივი ფეხბურთელების რომელსაც წაიკითხავთ players.json დან fs მოდულით

// GET /players?nation=georgia უდნა დააბრუნოს მხოლოდ ქართველი ფეხბურთელები

// GET /players?nation=germany მხოლოდ გერმანელი ფეხბურტელები და ა.შ

// POST /players უნდა გაატანოთ ფეხბურთელის ყველა მონაცემები ბექენდში დაადოთ ვალიდაცია და ჩაწეროთ players.json ში.

// DELETE /players/1 წაშლის კონკრეტულ ფეღბურთელს და განაახლებს players.json-ს

const http = require("http");
const url = require("url");

const users = [
  {
    id: 1,
    firstname: "giorgi",
    lastname: "abramishvili",
    age: 22,
    hobby: "Playing Football",
  },
  {
    id: 2,
    firstname: "mariami",
    lastname: "gamkhitashvili",
    age: 26,
    hobby: "Playing Basketball",
  },
  {
    id: 3,
    firstname: "nika",
    lastname: "mikadze",
    age: 25,
    hobby: "Playing Chess",
  },
];

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === "GET" && parsedUrl.pathname === "/about") {
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(JSON.stringify(users));
  }

  if (
    req.method === "GET" &&
    parsedUrl.pathname === "/players" &&
    parsedUrl.query.nation
  ) {
    const data = await fs.readFile("players.json", "utf-8");
    const players = JSON.parse(data);
    const filteredPlayers = players.filter(
      (player) =>
        player.country.toLowerCase() === parsedUrl.query.nation.toLowerCase(),
    );
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(JSON.stringify(filteredPlayers));
  }

  if (req.method === "GET" && parsedUrl.pathname === "/players") {
    const data = await fs.readFile("players.json", "utf-8");
    const players = JSON.parse(data);
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(JSON.stringify(players));
  }

  if (req.method === "POST" && parsedUrl.pathname === "/players") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      try {
        const parsedBody = JSON.parse(body);
        if (
          !parsedBody.name ||
          !parsedBody.country ||
          !parsedBody.position ||
          !parsedBody.club ||
          !parsedBody.age
        ) {
          res.writeHead(400);
          return res.end("Missing fields");
        }
        const data = await fs.readFile("players.json", "utf-8");
        const players = JSON.parse(data);
        const lastId = players[players.length - 1]?.id || 0;
        const newPlayer = {
          id: lastId + 1,
          name: parsedBody.name,
          country: parsedBody.country,
          position: parsedBody.position,
          club: parsedBody.club,
          age: parsedBody.age,
        };
        players.push(newPlayer);
        await fs.writeFile("players.json", JSON.stringify(players));
        res.writeHead(201, { "content-type": "application/json" });
        return res.end(
          JSON.stringify({ message: "player created successfully" }),
        );
      } catch {
        res.writeHead(400);
        return res.end("Invalid JSON");
      }
    });
  }
  if (req.method === "DELETE" && parsedUrl.pathname.startsWith("/players/")) {
    const playerId = parsedUrl.pathname.split("/")[2];
    const data = await fs.readFile("players.json", "utf-8");
    const players = JSON.parse(data);
    const index = players.findIndex((player) => player.id === Number(playerId));
    if (index === -1) {
      res.writeHead(404, { "content-type": "application/json" });
      return res.end(JSON.stringify({ message: "player not found" }));
    }

    players.splice(index, 1);
    await fs.writeFile("players.json", JSON.stringify(players));

    res.writeHead(200, { "content-type": "application/json" });
    return res.end(JSON.stringify({ message: "Player deleted successfully" }));
  }
});

server.listen((port = 4000), () => {
  console.log(`server running on port http://localhost:${port}`);
});

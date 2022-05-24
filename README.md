# CentasPrieCento

Runtime environment

Aplikacijos paleidimui reikalinga atlikti tam tikras proceduras

Užėję į Backend aplanką
1. PC reikia įdiegti node.js naujausia versija
2. Įdiegiamos technologijos "npm install express mongoose cors cookie-session jsonwebtoken bcryptjs --save"\ per terminalo langą
3. Paleidžiam serverį įrašę terminale "node server.js"

Užėję į Frontend aplanką
1. Įdiegiamos technologijos "npm i"\ naujame terminalo lange
2. npm start

Įdiegimas:
1. Patekimas į backend aplankalą:\
    1.1. "cd backend"\
        1.1.1. Įdiegiamos technologijos "npm install express mongoose cors cookie-session jsonwebtoken bcryptjs --save"\
        1.1.2. Serverio paleidimas "node server.js"
2. Atidaromas naujas terminalas\
    1.1. "cd frontend"\
        1.1.1. Įdiegiamos technologijos "npm install"\
        1.1.2. Įdiegiamos technologijos "npm install react-router-dom"\
                                        "npm install react-hook-form"\
                                        "npm install -S yup"\
                                        "npm install @hookform/resolvers"\
            **************              "npm install --save sfcookies"\
        1.1.3. Paleiždiamas development serveris "npm start"\
        1.1.4. Paleidžaimas json serviers "npx json-server --watch data/db.json --port 8000"

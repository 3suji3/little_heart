const fs = require('fs');
const path = require('path');

// CORS 헤더 설정
const setCORS = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

// db.json 읽기
const getDB = () => {
  const dbPath = path.join(process.cwd(), 'db.json');
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
};

// db.json 쓰기
const saveDB = (data) => {
  const dbPath = path.join(process.cwd(), 'db.json');
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

module.exports = (req, res) => {
  setCORS(res);

  // OPTIONS 요청 처리
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const url = req.url || '';
  const method = req.method;
  const db = getDB();

  // /users 엔드포인트
  if (url.startsWith('/users')) {
    if (method === 'GET') {
      return res.status(200).json(db.users || []);
    }
    
    if (method === 'POST') {
      const newUser = req.body;
      db.users = db.users || [];
      db.users.push(newUser);
      saveDB(db);
      return res.status(201).json(newUser);
    }
  }

  // /diary 엔드포인트
  if (url.startsWith('/diary')) {
    if (method === 'GET') {
      return res.status(200).json(db.diary || []);
    }
    
    if (method === 'POST') {
      const newDiary = req.body;
      db.diary = db.diary || [];
      db.diary.push(newDiary);
      saveDB(db);
      return res.status(201).json(newDiary);
    }
    
    if (method === 'PUT' || method === 'PATCH') {
      const id = url.split('/').pop();
      const updates = req.body;
      const index = db.diary.findIndex(d => d.id === id);
      
      if (index !== -1) {
        db.diary[index] = { ...db.diary[index], ...updates };
        saveDB(db);
        return res.status(200).json(db.diary[index]);
      }
      return res.status(404).json({ error: 'Not found' });
    }
    
    if (method === 'DELETE') {
      const id = url.split('/').pop();
      db.diary = db.diary.filter(d => d.id !== id);
      saveDB(db);
      return res.status(200).json({ success: true });
    }
  }

  return res.status(404).json({ error: 'Not found' });
};

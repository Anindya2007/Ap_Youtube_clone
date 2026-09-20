const fs = require('fs');
const path = require('path');

const videosFile = path.join(__dirname, 'data', 'videos.json');

function readJSON(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(raw)
  } catch (e) {
    return null
  }
}

try {
  const id = 'mr8yb6x5ebvs49t'; // ID of first video
  const author = 'Test Author';
  const text = 'Test Comment';
  const commentId = Math.random().toString(36).substr(2, 9);
  const user = { '_id': commentId, 'text': text, 'author': author, 'createdAt': new Date().toISOString() };
  let videos = readJSON(videosFile);
  let updatedComments = [];

  videos = videos.map((v) => {
    if (v._id === id) {
      updatedComments = [...v.comments, user];
      return { ...v, 'comments': updatedComments }
    }
    return v;
  });
  
  console.log("Success! Updated comments length:", updatedComments.length);
} catch (err) {
  console.error("Error caught:", err);
}

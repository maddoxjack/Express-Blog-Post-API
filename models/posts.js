const db = require("./conn.js");

// @TODO - convert delete and update methods to instance methods

class Posts {
  constructor(id, title, author, content) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.content = content;
  }

  static async getAll() {
    try {
      const response = await db.any(`select * from posts`);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async getById(id) {
    try {
      const response = await db.one(`select * from posts WHERE id=${id}`);
      console.log("hi", response);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async removeEntry(id) {
    try {
      const response = await db.result(`delete from posts where id = ${id}`);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async addEntry(title, author, content) {
    const query = `insert into posts (title, author, content) VALUES ('${title}', '${author}', '${content}')`;
    try {
      let response = await db.result(query);
      return response;
    } catch (err) {
      console.log("Error", err.message);
      return err;
    }
  }

  static async updateEntry(id, column, content) {
    const query = `UPDATE posts SET ${column} = ${content} WHERE id = '${id}'`;
    try {
      const response = await db.result(query);
      return response;
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = Posts;

/**
 * Create a new blog post given a title
 * Usage: node post.js [author] [title] [description]
 * Example: node post.js mike "Keeping Perspective" "Keep perspective on what you are building in tough times"
 */

const path = require('path')
const mkdirp = require('mkdirp')
const fs = require('fs')
const open = require('open')
const template = require('lodash/template')
const args = process.argv.slice(2)
const rspaces = /[\s-]+/g

const postTemplate = template(`---
title: <%- title %>
date: '<%- date %>'<% if(typeof description !== 'undefined') { %>
description: '<%- description %>'<% } %>
tags:
author: <%- author %>
hero:
draft: false
---

`)

function post(author, title, description) {
  return new Promise((resolve, reject) => {
    const name = title.toLowerCase().replace(rspaces, '-')
    const dir = path.join(__dirname, '/../content/blog/', name)
    const filename = path.join(dir, 'index.md')
    console.log('Creating file', filename)
    mkdirp(dir).then((made) => {
      if (made) {
        console.log('Directory created at ', made)
      } else {
        console.log('Directory already exists ', dir)
      }
      const date = new Date()
      fs.writeFile(
        filename,
        postTemplate({
          author,
          title,
          date: `${date.toISOString().slice(0, 10)}`,
          description
        }),
        'utf8',
        (fsErr) => {
          if (fsErr) {
            return reject(fsErr)
          }
          resolve(name)
        }
      )
    })
  }).then(
    (name) => {
      console.log(`Created post ${title}.`)
      return open(`http://localhost:8000/blog/${name}`)
    },
    (error) => {
      console.error(error)
      process.exit(1)
    }
  )
}

if (args.length) {
  post(...args)
} else {
  console.log(
    'Usage: npm run post "Blog Post Title" "This is a blog post description."'
  )
  throw new Error('Missing arguments')
}

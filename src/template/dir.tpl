<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, init=1.0">
    <title>{{title}}</title>
  </head>
  <body>
    {{#each files}}
      <a href="{{../dir}}/{{this}}">{{this}}</a>
    {{/each}}
  </body>
</html>

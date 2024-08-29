<p>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

Backbone of [namepicker.ai](https://github.com/aminoxix/namepicker.ai)

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

# Routes

```bash
# /user
create

{
  "id": string;
  "email": string;
  "username": string;
}
```

```bash
# generate username

# /prompt
usernames/create

{
  "name": string;
  "worded": "ONE" | "TWO";

  "userId": string;

  "isFav": boolean; # false
  "isCombo": boolean; # false
  "isUsername": boolean; # true
}
```

```bash
# generate favorite

# /prompt
favorites/create

{
  "aim": string;
  "name": string;
  "hobby": string;
  "animal": string;
  "background": string;
  "worded": "ONE" | "TWO";

  "userId": string;

  "isFav": boolean; # true
  "isCombo": boolean; # false
  "isUsername": boolean; # false
}

```

```bash
# generate combinations

# /prompt
combos/create

{
  "partner1": string;
  "partner2": string;
  "gender": string;

  "userId": string;

  "isFav": boolean; # false
  "isCombo": boolean; # true
  "isUsername": boolean; # false
}


```

```bash
# /gemini

chat

{
  "role": 'user' | 'system' | 'assistant';
  "content": string;
  "userId": string;
}
```

## 📰 license

> the **naamkaran server** project is released under the [MIT license](https://github.com/aminoxix/naamkaran-backend/blob/main/LICENSE). <br> developed &amp; maintained by aminos. Copyright 2024 © aminos.

<hr>

### built with ♡ by

> **profile** <a href="https://aminoxix.vercel.app" target="_blank" rel="noopener">@aminoxix</a> &nbsp;&middot;&nbsp; **x** <a href="https://twitter.com/aminoxix" target="_blank" rel="noopener">@aminoxix</a>

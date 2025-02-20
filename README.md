# playwright-ts-demobank-sample-app

Application with Type Script language and Playwright framework for training purposes.

## GitHub commands

- `git init`
- `git config user.name "paulinakaras"`
- `git config user.email "ppaulina.karas@gmail.com"`
- `git status`
- `git add .`
- `git commit -m "title"`
- `git push -u origin main`

## Playright commands

- `npm init playwright@latest` - initialize Playwright project
- `npx playwright codegen https://demo-bank.vercel.app/` - run code generation mode (code, web windows)
- `npx playwright test` - run tests withow browser window
- `npx playwright show-report` - show reports
- `npx playwright test --headed` - run test with web browser window
- `npx playwright test --repeat-each=10` - run test and repeat multiple times
- `npx playwright test --retries=3` - try to retry test multiple times if test failed
- `npx playwright show-trace trace.zip` - run Trace Viewer for trace.zip file, remember to select correct path, find direct folder -> right mouse click -> Open in Integrated Terminal
- `npx playwright test tests/login.spec.ts` - run test for specific file

## Visual Studio Code

- `shift + option + F` - format document
- `command +` - zoom in
- `command -` - zoom out
- `option + left/right arrow` - skip whole word
- `option + shift + left/right arrow` - mark whole word
- `option + shift + down arrow` - duplicate code line
- `control + shift + R` - refactor
- `option + up/down arrow` - move up/down the line
- `fn + F2` - rename
- `command + shift + P` - open possible instructions (eg Open User Settings)
- `command + shift + P -> Reload Window` - usefull when tests can not be run via Testing tab (left navbar)
- `command + S` - save file - also formating because of 'format on save' option enabled

## Terminal commands

- `command + backspace` - remove whole line
- `option + backspace` - remove whole word
- `option + left/right arrow` - skip whole word

## Prettier

- `npm install --save-dev --save-exact pretier` - install Prettier package
- `npx prettier --write .` - run Priettier
- additionaly you can install VSC extension: Priettier

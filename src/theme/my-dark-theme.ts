import type { ThemeRegistration } from 'shiki';

const myDarkTheme: ThemeRegistration = {
  name: "complete-dark",
  type: "dark",
  colors: {
    'editor.background': '#111111',
    'editor.foreground': '#eeeeee'
  },
  settings: [
    { scope: ['comment', 'comment.line', 'comment.block'], settings: { foreground: '#7E9C91', fontStyle: 'italic' } },
    { scope: ['keyword', 'storage.type', 'storage.modifier'], settings: { foreground: '#57CA9B', fontStyle: 'bold' } },
    { scope: ['string', 'string.quoted', 'string.template'], settings: { foreground: '#FF6E6E' } },
    { scope: ['variable', 'identifier', 'entity.name.variable'], settings: { foreground: '#EDEDED' } },
    { scope: ['function', 'entity.name.function', 'support.function'], settings: { foreground: '#66C29D' } },
    { scope: ['constant.numeric', 'constant.language.boolean'], settings: { foreground: '#A5D6FF' } },
    { scope: ['punctuation', 'meta.brace', 'meta.delimiter'], settings: { foreground: '#888888' } },
    { scope: ['entity.name.type', 'support.type', 'storage.type.class'], settings: { foreground: '#F2B3FF' } },
    { scope: ['invalid'], settings: { foreground: '#FF5555', fontStyle: 'underline' } }
  ]
};

export default myDarkTheme;

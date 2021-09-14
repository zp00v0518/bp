import k from '../../parser/parseConfig/matchKey';

console.log(k);

const locales = {
  ru: {
    [k.more]: 'больше',
    [k.less]: 'меньше',
    [k.win1]: 'победа 1',
    [k.win2]: 'победа 2',
    [k.draw]: 'ничья',
    [k.win1_win2]: 'победа 1 или победа 2',
    [k.win1_draw]: 'победа 1 или ничья',
    [k.win2_draw]: 'победа 2 или ничья'
  }
};

export default locales;

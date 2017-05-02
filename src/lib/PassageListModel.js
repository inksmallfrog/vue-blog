/*
* @Author: inksmallfrog
* @Date:   2017-05-02 09:24:34
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-02 11:14:19
*/

'use strict';
import passages from '@/assets/passages.json'
const categoriesAllowed = ['生活', '艺术', '技术'];
/*
 * 将文章列表打包为按时间封装的结构
 * @param: categoriesSelected<Array> 需要打包的文章分类数组
 * @return: <Object>
 * shape: [
 *     Array:{
 *         year:string,
 *         passages:[
 *             Array:{
 *                 month:string,
 *                 passages:[
 *                     Array:{
 *                         title:string,
 *                         category:string,
 *                         date:string
 *                     }
 *                 ]
 *             }
 *         ]
 *     }
 * ]
 */
export function parsePassageList(categoriesSelected){
    let passagesParsed = [],
        passagesYearIndexMap = {},
        passagesYearMonthIndexMap = {};
    passages.forEach((passage)=>{
        //将默认的分类设置为生活
        if(categoriesAllowed.indexOf(passage.category) < 0){
            passage.category = '生活';
        }
        //仅打包在给定分类内的文章
        if(categoriesSelected[passage.category]){
            let date = passage.date.split('-');
            if(date.length != 3){
                //err
            }
            else{
                const year = date[0],
                      month = date[1],
                      day = date[2]
                if(passagesYearIndexMap[year] == undefined){
                    let yearPassages = {
                        year: year,
                        passages: []
                    }
                    let index = passagesParsed.push(yearPassages) - 1;
                    passagesYearIndexMap[year] = index;
                }
                let yearIndex = passagesYearIndexMap[year],
                    yearPassages = passagesParsed[yearIndex],
                    yearMonthId = year + '-' + month;

                if(passagesYearMonthIndexMap[yearMonthId] == undefined){
                    let monthPassages = {
                        month: month,
                        passages: []
                    }
                    let index = yearPassages.passages.push(monthPassages) - 1;
                    passagesYearMonthIndexMap[yearMonthId] = index;
                }
                let monthIndex = passagesYearMonthIndexMap[yearMonthId],
                    monthPassages = yearPassages.passages[monthIndex];
                monthPassages.passages.push({
                    title: passage.title,
                    date: day.split(' ')[0],
                    src : passage.src,
                    category: passage.category
                });
            }
        }
    })
    return passagesParsed;
}

/*
 * 获取给定src文章的邻居文章
 * @param passage_src
 * @return object: {
 *            next: <passage> or null
 *            last: <passage> or null
 *         }
 */
export function getNeighbor(src){
  let next = null,
      last = null,
      originIndex = passages.findIndex((passage)=>{
        return passage.src === src;
      });
  if(originIndex != 0){
    next = passages[originIndex - 1];
  }
  if(originIndex != passages.length - 1){
    last = passages[originIndex + 1];
  }
  return {
    next,
    last
  };
}

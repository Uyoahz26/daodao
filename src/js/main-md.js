/**
 * @description:
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2021-03-05 14:51:30
 * @LastEditTime: 2021-03-05 14:51:30
 * @LastEditors: 小康
 */

import { render } from '../view'
import marked from 'marked'
async function init(options) {
  render(options, marked)
}
export default init

export { init }

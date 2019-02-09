/**
 * Task Tests.
 *
 * Nothing in this file offers any functionality,
 * only tests of it.
 */
window.onload = () => {
  /**
   * Test for #1.1 task.
   */
  const ps = selectDOM('p');
  console.log(ps);
  console.log(ps.get(1));
  console.log(ps.length());

  /**
   * Test for #1.2 task.
   */
  selectDOM('div')
    .append('<b>I\'m BOLD</b>')
    .prepend('<i>I\'m ITALIC</i>');

  /**
   * Test for #1.2 task.
   */
  selectDOM('i').get(0).delete();
};

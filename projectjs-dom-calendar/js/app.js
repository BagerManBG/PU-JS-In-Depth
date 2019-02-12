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
  (function () {
    console.log('%c#######   Test for 1.1   #######', 'color: green');

    const ps = selectDOM('p');
    console.log(ps);
    console.log(ps.get(1));
    console.log(ps.length());

    console.log();
  })();

  /**
   * Test for #1.2 task.
   */
  (function () {
    console.log('%c#######   Test for 1.2   #######', 'color: green');

    selectDOM('div')
      .append('<b>I\'m BOLD</b>')
      .prepend('<i>I\'m ITALIC</i>');

    console.log();
  })();

  /**
   * Test for #1.3 task.
   */
  (function () {
    console.log('%c#######   Test for 1.3   #######', 'color: green');

    selectDOM('i').get(0).delete();

    console.log();
  })();

  /**
   * Test for #1.4a task.
   */
  (function () {
    console.log('%c#######   Test for 1.4a   #######', 'color: green');

    const firstParClass = selectDOM('p#a')
      .attr('data-c', 'ccc')
      .attr('data-e', 'eee')
      .attr('class');
    console.log(firstParClass);

    console.log();
  })();

  /**
   * Test for #1.4b task.
   */
  (function () {
    console.log('%c#######   Test for 1.4b   #######', 'color: green');

    const firstPar = selectDOM('p#a').get(0);
    console.log(firstPar.text());
    firstPar.text('I am a paragraph and my text was changed.');
    console.log(firstPar.text());

    console.log();
  })();

  /**
   * Test for #1.4c task.
   */
  (function () {
    console.log('%c#######   Test for 1.4c   #######', 'color: green');

    selectDOM('body').append('<div id="div-at-the-end">empty</div>');

    const endDiv = selectDOM('#div-at-the-end');
    console.log(endDiv.html());
    endDiv.html('<b> I\'m no longer empty!</b>');
    console.log(endDiv.html());

    console.log();
  })();

  /**
   * Test for #1.4d task.
   */
  (function () {
    console.log('%c#######   Test for 1.4d   #######', 'color: green');

    const allParagraphs = selectDOM('p');
    const allDivs = selectDOM('div');

    allParagraphs.css('color', 'red');
    allDivs.css({
      marginTop: '50px',
      marginBottom: '50px',
      fontSize: '14px',
      width: '100%',
    });

    console.log();
  })();

  /**
   * Test for #1.5a task.
   */
  (function () {
    console.log('%c#######   Test for 1.5a   #######', 'color: green');

    console.log(selectDOM('p').parent());

    console.log();
  })();

  /**
   * Test for #1.5b/c task.
   */
  (function () {
    console.log('%c#######   Test for 1.5b/c   #######', 'color: green');

    const el = selectDOM('div p').get(1);

    console.log(el.siblings());
    console.log(el.siblings('before'));
    console.log(el.siblings('after'));

    el.siblings().css('color', '#fac');
    el.siblings('before').attr('data-sibling', 'before');
    el.siblings('after').attr('data-sibling', 'after');

    console.log();
  })();

  /**
   * Test for #1.5d task.
   */
  (function () {
    console.log('%c#######   Test for 1.5d   #######', 'color: green');

    console.log(selectDOM('div').get(0).children());
    selectDOM('div').get(0).children().css('fontFamily', 'Monotype Corsiva');

    console.log();
  })();

  /**
   * Test for #1.6 task.
   */
  (function () {
    console.log('%c#######   Test for 1.6   #######', 'color: green');

    selectDOM('body').prepend('<div class="chain"><p>Chaining</p></div>');
    selectDOM('.chain')
      .attr('id', 'chain')
      .children()
      .get(0)
      .text('Chaining, New Text')
      .css('fontSize', '20px')
      .parent()
      .css('textAlign', 'center')
      .append('<p>New Element, next to chain</p>')
      .append('<p>New Element, next to chain</p>')
      .children()
      .attr('data-chain', 'chain');

    console.log();
  })();
};

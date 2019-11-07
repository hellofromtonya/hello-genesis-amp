<?php
/**
 * Theme Setup unit test.
 *
 * @package     Hello_From_Tonya\Hello_Genesis_AMP\Tests
 * @since       1.0.0
 * @author      Tonya Mork <hellofromtonya>
 * @link        https://github.com/hellofromtonya/hello-genesis-amp
 * @license     GPL-2+
 */

namespace Hello_From_Tonya\Hello_Genesis_AMP\Tests\Unit;

use Brain\Monkey\Functions;

/**
 * Test Theme Setup.
 */
class Theme_Setup_Test extends TestCase {

	/**
	 * Sets up the fixture, for example, open a network connection.
	 *
	 * This method is called before a test is executed.
	 */
	public function setUp() {
		require_once CHILD_THEME_ROOT_DIR . '/lib/class-theme-setup.php';

		parent::setUp();
	}

	/**
	 * Test placeholder.
	 */
	public function test_placeholder() {
		$this->assertTrue( true );
	}
}

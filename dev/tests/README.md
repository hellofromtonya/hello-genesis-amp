# Genesis AMP Tests

These test suites utilize the same architecture and tooling as the Genesis framework.

## Structure

* `/tests/fixtures` contains dummy files used in tests.
* `/tests/Integration` contains the integration testcase (extends `PHPUnit\Framework\TestCase`) and integration tests.
* `/tests/system` contains the integration testcase (extends `WP_UnitTestCase`) and integration tests.
* `/tests/Unit` contains the unit testcase (extends `PHPUnit\Framework\TestCase`) and unit tests.
* `/tests/bootstrap.php` determines which testsuite is being run, and sets up the test environment accordingly.

Individual test files are located in a directory structure that mirrors the source files. i.e. `/tests/Unit/lib/functions/general.php`. One test file covers one library file.

### Definitions

- **Unit Tests** only test a single function or method in Genesis. Everything else, including other parts of Genesis, should be mocked.
- **Integration Tests** test how multiple parts of Genesis work together. Everything outside of Genesis should be mocked.
- **System Tests** test how Genesis and WordPress work together. It uses WP functions and the database.

## Set Up

Run `composer install`, so that you get a local version of PHPUnit at `./vendor/bin/phpunit`.

Depending on your local server setup, different instructions are needed. Pull requests welcome to improve the clarification in these sections!

### Local By Flywheel

Use this [setup script](https://gist.github.com/keesiemeijer/a888f3d9609478b310c2d952644891ba) to get the WP Test Library available at `/tmp/wordpress-test-lib` inside LBF.

### VVV

If you use VVV, then the `wordpress-develop` site already has what you need, and you can define this in your shell instead (adjust vagrant path to suit):

```sh
export WP_TESTS_DIR=~/vagrant/www/wordpress-develop/tests/phpunit
```

If you've got the Genesis repo under a different local VVV site than `wordpress-develop`, then update the `ABSPATH` in `wp-tests-config.php`:
```php
//define( 'ABSPATH', dirname( __FILE__ ) . '/src/' ); // Test WP Core and plugins / themes in this site
define( 'ABSPATH', __DIR__ . '/../genesis/htdocs/' ); // Path to the public root of the site with Genesis in.
```

### Manual

You will need to checkout the WordPress develop repository with SVN **or** Git and set `WP_TESTS_DIR` as environment variable.

#### Manual (Mac and Linux)

Open your shell.

For a SVN checkout, type:
```sh
svn co https://develop.svn.wordpress.org/trunk/ /tmp/wordpress-tests-lib
```

For a Git checkout, type:
```sh
git clone git://develop.git.wordpress.org/ /tmp/wordpress-tests-lib
```

Define this in your shell:

```sh
export WP_TESTS_DIR=/tmp/wordpress-tests-lib
```

Amend the path if you've checked it out to somewhere else.

Update the `wp-tests-config.php` with the credentials for a *fresh database*. Running the unit tests will **WIPE THE DATABASE**, so don't use your regular credentials.

#### Manual (Windows)

Open your console and navigate to the folder into which you want to copy the repository.

For a SVN checkout, type:
```sh
svn co https://develop.svn.wordpress.org/trunk/ wordpress-develop
```

For a Git checkout, type:
```sh
git clone git://develop.git.wordpress.org/ wordpress-develop
```

After the checkout is complete, move into the `wordpress-develop` folder.

Copy `wp-tests-config-sample.php` to `wp-tests-config.php`.

Update `wp-tests-config.php` with the credentials for a *fresh database*. Running the unit tests will **WIPE THE DATABASE**, so don't use your regular credentials.

Set `WP_TESTS_DIR` as environment variable.

In your console, type:
```sh
setx WP_TESTS_DIR "path\to\wordpress-develop\tests\phpunit"
echo WP_TESTS_DIR
```

You have to close the console for this to take effect.

The environment variable is usually available when you open a new console window. Sometimes, you have to restart the computer for this change to take effect.

## Unit Tests

Unit tests do _not_ need WordPress to be booted, so these can be run from your local filesystem. WordPress functions are mocked (monkey-patched) to provide minimal behaviour, without needing the actual original function definition.

Unit tests typically run 3-4 times quicker than system tests. The aim is to ensure that Genesis code works well on its own.

1. Move into the correct directory:

  ```sh
  cd /your/path/to/genesis
  ```

2. Run the tests:

  ```sh
  phpunit --testsuite unit
  ```

  You can also limit by group e.g.:

  ```sh
  phpunit --testsuite unit --group=contributors
  ```

  Some tests are in multiple groups, so you may want to run some, but not others:

  ```sh
  phpunit --testsuite unit --group=functions --exclude-group=deprecated
  ```

## Integration Tests

Integration tests do _not_ need WordPress to be booted, so these can be run from your local filesystem. WordPress functions are mocked (monkey-patched) to provide minimal behaviour, without needing the actual original function definition.

Integration tests typically run 3-4 times quicker than system tests. The aim is to ensure that different parts of Genesis code works well with itself.

1. Move into the correct directory:

  ```sh
  cd /your/path/to/genesis
  ```

2. Run the tests:

  ```sh
  phpunit --testsuite integration
  ```

  You can also limit by group e.g.:

  ```sh
  phpunit --testsuite integration --group=contributors
  ```

  Some tests are in multiple groups, so you may want to run some, but not others:

  ```sh
  phpunit --testsuite integration --group=functions --exclude-group=deprecated
  ```

## System Tests

System tests _do_ need WordPress - the tests may write to the database, and rely on the original WordPress function definitions.

System tests are generally slower. The aim is to ensure that Genesis works well with WordPress code.

1. SSH into your local server environment.

2. Move into the correct directory:

  ```sh
  cd /your/path/to/genesis
  ```

3. Run the tests:

  ```sh
  phpunit --testsuite system
  ```

  As per unit tests, you can also limit by group e.g.:

  ```sh
  phpunit --testsuite system --group=customizer
  ```

## Composer Scripts

For easier testing, scripts have been added to Composer:

- `> composer unit-test` - Runs `phpunit --testsuite unit`
- `> composer integration-test` - Runs `phpunit --testsuite integration`
- `> composer system-test` - Runs `phpunit --testsuite system`
- `> composer test` - Runs each of the above commands in order i.e. **runs all the tests**.

## Technical Notes

* In theory, much of the logic in `bootstrap.php` could be moved into a custom TestListener. For unit tests, that works, but for integration tests, it doesn't.

  The problem comes from the fact that PHPUnit parses the integration test files, _before_ calling the `TestListener::startTestSuite()`, where we might move the logic to. However, the integration tests are based on our integration testcase which extends `WP_UnitTestCase`, and that isn't available until the WP test environment has been bootstrapped. As such, we have a chicken and egg situation, so right now, a TestListener can't be used.

* PHPUnit 5.7 is used, though as of 2nd February 2018, the PHPUnit v5 branch is unsupported.
* All the tests run in single site instance. Multisite testing will be added - see [this](http://www.codetab.org/wordpress-plugin-development-tutorial/wordpress-multisite-plugin-unit-tests/) as a reference.
* No JavaScript (i.e. qunit) tests exist yet, but if they do, the PHP tests structure should move down into a `tests/phpunit` directory.
* Tests are not yet run as part of a pre-commit / Travis CI integration, but that's the aim, so any changes to the library code should also update the tests code as needed.
* Test coverage is not yet reported as it is known to be low, and some users don't have XDebug available on their system. You can add a local `phpunit.xml` (already ignored in Git) to add this in.

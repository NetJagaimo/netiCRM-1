var system = require('system'); 
var port = system.env.RUNPORT; 
var baseURL = port == '80' ? 'http://127.0.0.1/' : 'http://127.0.0.1:' + port + '/';

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

casper.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg);
});

casper.test.begin('Resurrectio test', function(test) {
    casper.start(baseURL, function() {
        casper.echo('=====================================');
        casper.echo('** Step 0: Login. **');
        casper.echo('=====================================');
        // this.capture('login.png');
    });
    casper.waitForSelector("form#user-login-form input[name='name']", function success() {
        test.assertExists("form#user-login-form input[name='name']");
        this.click("form#user-login-form input[name='name']");
    }, function fail() {
        test.assertExists("form#user-login-form input[name='name']");
    });
    casper.waitForSelector("input[name='name']", function success() {
        this.sendKeys("input[name='name']", "admin");
    }, function fail() {
        test.assertExists("input[name='name']");
    });
    casper.waitForSelector("input[name='pass']", function success() {
        this.sendKeys("input[name='pass']", "123456");
    }, function fail() {
        test.assertExists("input[name='pass']");
    });
    casper.waitForSelector("form#user-login-form input[type=submit][value='Log in']", function success() {
        test.assertExists("form#user-login-form input[type=submit][value='Log in']");
        this.click("form#user-login-form input[type=submit][value='Log in']");
    }, function fail() {
        test.assertExists("form#user-login-form input[type=submit][value='Log in']");
    }); /* submit form */

    casper.thenOpen(baseURL + "civicrm/admin/uf/group?reset=1", function() {
    });

    casper.waitForSelector("#newCiviCRMProfile-top", function success() {
        this.click("#newCiviCRMProfile-top");
    }, function fail() {
        test.assertExists("#newCiviCRMProfile-top", "Assert 'Add Profile' button exist.");
    });

    casper.wait(2000);

    casper.then(function() {
        casper.echo('=====================================');
        casper.echo('** Step 1: New Profile. **');
        casper.echo('=====================================');
    });

    var profile_name = makeid(5);
    casper.waitForSelector("input[name='title']", function success() {
        this.sendKeys("input[name='title']", profile_name);
    }, function fail() {
        test.assertExists("input[name='title']", "Assert 'Profile Name' field exist.");
    });

    casper.waitForSelector("input[name='uf_group_type_user[User Registration]']", function success() {
        this.click("input[name='uf_group_type_user[User Registration]']");
    }, function fail() {
        test.assertExists("input[name='uf_group_type_user[User Registration]']", "Assert 'Drupal User Registration' exist.");
    });

    casper.waitForSelector("input[name='uf_group_type_user[User Account]']", function success() {
        this.click("input[name='uf_group_type_user[User Account]']");
    }, function fail() {
        test.assertExists("input[name='uf_group_type_user[User Account]']", "Assert 'View/Edit Drupal User Account' exist.");
    });

    casper.waitForSelector("input[value='Save']", function success() {
        this.click("input[value='Save']");
    }, function fail() {
        test.assertExists("input[value='Save']", "Assert 'Save' button exist.");
    });

    casper.wait(2000);

    casper.then(function() {
        casper.echo('=====================================');
        casper.echo('** Step 2: Add Fields. **');
        casper.echo('=====================================');
    });

    casper.then(function() {
        casper.echo("Step 2-1: Add individual: Fist Name.");
    });

    casper.waitForSelector("select[name='field_name[0]']", function success() {
        this.evaluate(function () {
            document.querySelector('select[name="field_name[0]"]').value = "Individual";
            var s = document.querySelector('select[name="field_name[0]"]');
            swapOptions(s.form, 'field_name', 0, 4, 'hs_field_name');
        });
    }, function fail() {
        test.assertExists("select[name='field_name[0]']", "Assert 'Please select a field name' exist.");
    });

    casper.waitForSelector("select[name='field_name[1]']", function success() {
        this.evaluate(function () {
            document.querySelector('select[name="field_name[1]"]').value = "first_name";
        });
    }, function fail() {
        test.assertExists("select[name='field_name[1]']", "Assert individual options exist.");
    });

    casper.waitForSelector("input[name='label']", function success() {
        this.sendKeys("input[name='label']", "First Name");
    }, function fail() {
        test.assertExists("input[name='label']", "Assert 'Field Label' field exist.");
    });

    casper.waitForSelector("input[value='Save and New']", function success() {
        this.click("input[value='Save and New']");
    }, function fail() {
        test.assertExists("input[value='Save and New']", "Assert 'Save and New' button exist.");
    });

    casper.wait(1000);

    casper.then(function() {
        casper.echo("Step 2-2: Add individual: Last Name.");
    });

    casper.waitForSelector("select[name='field_name[0]']", function success() {
        this.evaluate(function () {
            document.querySelector('select[name="field_name[0]"]').value = "Individual";
            var s = document.querySelector('select[name="field_name[0]"]');
            swapOptions(s.form, 'field_name', 0, 4, 'hs_field_name');
        });
    }, function fail() {
        test.assertExists("select[name='field_name[0]']", "Assert 'Please select a field name' exist.");
    });

    casper.waitForSelector("select[name='field_name[1]']", function success() {
        this.evaluate(function () {
            document.querySelector('select[name="field_name[1]"]').value = "last_name";
        });
    }, function fail() {
        test.assertExists("select[name='field_name[1]']", "Assert individual options exist.");
    });

    casper.waitForSelector("input[name='label']", function success() {
        this.sendKeys("input[name='label']", "Last Name");
    }, function fail() {
        test.assertExists("input[name='label']", "Assert 'Field Label' field exist.");
    });

    casper.waitForSelector("input[value='Save and New']", function success() {
        this.click("input[value='Save and New']");
    }, function fail() {
        test.assertExists("input[value='Save and New']", "Assert 'Save and New' button exist.");
    });

    casper.wait(1000);

    casper.then(function() {
        casper.echo("Step 2-3: Add individual: Legal Identifier.");
    });

    casper.waitForSelector("select[name='field_name[0]']", function success() {
        this.evaluate(function () {
            document.querySelector('select[name="field_name[0]"]').value = "Individual";
            var s = document.querySelector('select[name="field_name[0]"]');
            swapOptions(s.form, 'field_name', 0, 4, 'hs_field_name');
        });
    }, function fail() {
        test.assertExists("select[name='field_name[0]']", "Assert 'Please select a field name' exist.");
    });

    casper.waitForSelector("select[name='field_name[1]']", function success() {
        this.evaluate(function () {
            document.querySelector('select[name="field_name[1]"]').value = "legal_identifier";
        });
    }, function fail() {
        test.assertExists("select[name='field_name[1]']", "Assert individual options exist.");
    });

    casper.waitForSelector("input[name='label']", function success() {
        this.sendKeys("input[name='label']", "Legal Identifier");
    }, function fail() {
        test.assertExists("input[name='label']", "Assert 'Field Label' field exist.");
    });

    casper.waitForSelector("input[value='Save and New']", function success() {
        this.click("input[value='Save and New']");
    }, function fail() {
        test.assertExists("input[value='Save and New']", "Assert 'Save and New' button exist.");
    });

    casper.wait(1000);

    casper.then(function() {
        casper.echo("Step 2-4: Add individual: Current Employer.");
    });

    casper.waitForSelector("select[name='field_name[0]']", function success() {
        this.evaluate(function () {
            document.querySelector('select[name="field_name[0]"]').value = "Individual";
            var s = document.querySelector('select[name="field_name[0]"]');
            swapOptions(s.form, 'field_name', 0, 4, 'hs_field_name');
        });
    }, function fail() {
        test.assertExists("select[name='field_name[0]']", "Assert 'Please select a field name' exist.");
    });

    casper.waitForSelector("select[name='field_name[1]']", function success() {
        this.evaluate(function () {
            document.querySelector('select[name="field_name[1]"]').value = "current_employer";
        });
    }, function fail() {
        test.assertExists("select[name='field_name[1]']", "Assert individual options exist.");
    });

    casper.waitForSelector("input[name='label']", function success() {
        this.sendKeys("input[name='label']", "Current Employer");
    }, function fail() {
        test.assertExists("input[name='label']", "Assert 'Field Label' field exist.");
    });

    casper.waitForSelector("input[value='Save and New']", function success() {
        this.click("input[value='Save and New']");
    }, function fail() {
        test.assertExists("input[value='Save and New']", "Assert 'Save and New' button exist.");
    });

    casper.wait(1000);

    casper.then(function() {
        casper.echo("Step 2-5: Add Contact info: Phone.");
    });

    casper.waitForSelector("select[name='field_name[0]']", function success() {
        this.evaluate(function () {
            document.querySelector('select[name="field_name[0]"]').value = "Contact";
            var s = document.querySelector('select[name="field_name[0]"]');
            swapOptions(s.form, 'field_name', 0, 4, 'hs_field_name');
        });
    }, function fail() {
        test.assertExists("select[name='field_name[0]']", "Assert 'Please select a field name' exist.");
    });

    casper.waitForSelector("select[name='field_name[1]']", function success() {
        this.evaluate(function () {
            document.querySelector('select[name="field_name[1]"]').value = "phone";
        });
    }, function fail() {
        test.assertExists("select[name='field_name[1]']", "Assert contact info options exist.");
    });

    casper.waitForSelector("input[name='label']", function success() {
        this.sendKeys("input[name='label']", "Phone");
    }, function fail() {
        test.assertExists("input[name='label']", "Assert 'Field Label' field exist.");
    });

    casper.waitForSelector("input[value='Save and New']", function success() {
        this.click("input[value='Save and New']");
    }, function fail() {
        test.assertExists("input[value='Save and New']", "Assert 'Save and New' button exist.");
    });

    casper.wait(1000);

    casper.then(function() {
        casper.echo("Step 2-6: Add Contact info: State.");
    });

    casper.waitForSelector("select[name='field_name[0]']", function success() {
        this.evaluate(function () {
            document.querySelector('select[name="field_name[0]"]').value = "Contact";
            var s = document.querySelector('select[name="field_name[0]"]');
            swapOptions(s.form, 'field_name', 0, 4, 'hs_field_name');
        });
    }, function fail() {
        test.assertExists("select[name='field_name[0]']", "Assert 'Please select a field name' exist.");
    });

    casper.waitForSelector("select[name='field_name[1]']", function success() {
        this.evaluate(function () {
            document.querySelector('select[name="field_name[1]"]').value = "state_province";
        });
    }, function fail() {
        test.assertExists("select[name='field_name[1]']", "Assert contact info options exist.");
    });

    casper.waitForSelector("input[name='label']", function success() {
        this.sendKeys("input[name='label']", "State");
    }, function fail() {
        test.assertExists("input[name='label']", "Assert 'Field Label' field exist.");
    });

    casper.waitForSelector("input[value='Save and New']", function success() {
        this.click("input[value='Save and New']");
    }, function fail() {
        test.assertExists("input[value='Save and New']", "Assert 'Save and New' button exist.");
    });

    casper.wait(1000);

    casper.then(function() {
        casper.echo("Step 2-7: Add Contact info: City.");
    });

    casper.waitForSelector("select[name='field_name[0]']", function success() {
        this.evaluate(function () {
            document.querySelector('select[name="field_name[0]"]').value = "Contact";
            var s = document.querySelector('select[name="field_name[0]"]');
            swapOptions(s.form, 'field_name', 0, 4, 'hs_field_name');
        });
    }, function fail() {
        test.assertExists("select[name='field_name[0]']", "Assert 'Please select a field name' exist.");
    });

    casper.waitForSelector("select[name='field_name[1]']", function success() {
        this.evaluate(function () {
            document.querySelector('select[name="field_name[1]"]').value = "city";
        });
    }, function fail() {
        test.assertExists("select[name='field_name[1]']", "Assert contact info options exist.");
    });

    casper.waitForSelector("input[name='label']", function success() {
        this.sendKeys("input[name='label']", "City");
    }, function fail() {
        test.assertExists("input[name='label']", "Assert 'Field Label' field exist.");
    });

    casper.waitForSelector("input[value='Save and New']", function success() {
        this.click("input[value='Save and New']");
    }, function fail() {
        test.assertExists("input[value='Save and New']", "Assert 'Save and New' button exist.");
    });

    casper.wait(1000);

    casper.then(function() {
        casper.echo("Step 2-8: Add Contact info: Postal Code.");
    });

    casper.waitForSelector("select[name='field_name[0]']", function success() {
        this.evaluate(function () {
            document.querySelector('select[name="field_name[0]"]').value = "Contact";
            var s = document.querySelector('select[name="field_name[0]"]');
            swapOptions(s.form, 'field_name', 0, 4, 'hs_field_name');
        });
    }, function fail() {
        test.assertExists("select[name='field_name[0]']", "Assert 'Please select a field name' exist.");
    });

    casper.waitForSelector("select[name='field_name[1]']", function success() {
        this.evaluate(function () {
            document.querySelector('select[name="field_name[1]"]').value = "postal_code";
        });
    }, function fail() {
        test.assertExists("select[name='field_name[1]']", "Assert contact info options exist.");
    });

    casper.waitForSelector("input[name='label']", function success() {
        this.sendKeys("input[name='label']", "Postal Code");
    }, function fail() {
        test.assertExists("input[name='label']", "Assert 'Field Label' field exist.");
    });

    casper.waitForSelector("input[value='Save and New']", function success() {
        this.click("input[value='Save and New']");
    }, function fail() {
        test.assertExists("input[value='Save and New']", "Assert 'Save and New' button exist.");
    });

    casper.wait(1000);

    casper.then(function() {
        casper.echo("Step 2-9: Add Contact info: Street Address.");
    });

    casper.waitForSelector("select[name='field_name[0]']", function success() {
        this.evaluate(function () {
            document.querySelector('select[name="field_name[0]"]').value = "Contact";
            var s = document.querySelector('select[name="field_name[0]"]');
            swapOptions(s.form, 'field_name', 0, 4, 'hs_field_name');
        });
    }, function fail() {
        test.assertExists("select[name='field_name[0]']", "Assert 'Please select a field name' exist.");
    });

    casper.waitForSelector("select[name='field_name[1]']", function success() {
        this.evaluate(function () {
            document.querySelector('select[name="field_name[1]"]').value = "street_address";
        });
    }, function fail() {
        test.assertExists("select[name='field_name[1]']", "Assert contact info options exist.");
    });

    casper.waitForSelector("input[name='label']", function success() {
        this.sendKeys("input[name='label']", "Street Address");
    }, function fail() {
        test.assertExists("input[name='label']", "Assert 'Field Label' field exist.");
    });

    casper.waitForSelector("input[value='Save and New']", function success() {
        this.click("input[value='Save and New']");
    }, function fail() {
        test.assertExists("input[value='Save and New']", "Assert 'Save and New' button exist.");
    });

    casper.wait(1000);

    casper.then(function() {
        casper.echo("Step 2-10: Add Contact info: Email.");
    });

    casper.waitForSelector("select[name='field_name[0]']", function success() {
        this.evaluate(function () {
            document.querySelector('select[name="field_name[0]"]').value = "Contact";
            var s = document.querySelector('select[name="field_name[0]"]');
            swapOptions(s.form, 'field_name', 0, 4, 'hs_field_name');
        });
    }, function fail() {
        test.assertExists("select[name='field_name[0]']", "Assert 'Please select a field name' exist.");
    });

    casper.waitForSelector("select[name='field_name[1]']", function success() {
        this.evaluate(function () {
            document.querySelector('select[name="field_name[1]"]').value = "email";
        });
    }, function fail() {
        test.assertExists("select[name='field_name[1]']", "Assert contact info options exist.");
    });

    casper.waitForSelector("input[name='label']", function success() {
        this.sendKeys("input[name='label']", "Email");
    }, function fail() {
        test.assertExists("input[name='label']", "Assert 'Field Label' field exist.");
    });

    casper.waitForSelector("input[value='Save and New']", function success() {
        this.click("input[value='Save and New']");
    }, function fail() {
        test.assertExists("input[value='Save and New']", "Assert 'Save and New' button exist.");
    });

    casper.wait(1000);

    casper.then(function() {
        casper.echo("Step 2-11: Add Contact info: Do Not Email.");
    });

    casper.waitForSelector("select[name='field_name[0]']", function success() {
        this.evaluate(function () {
            document.querySelector('select[name="field_name[0]"]').value = "Contact";
            var s = document.querySelector('select[name="field_name[0]"]');
            swapOptions(s.form, 'field_name', 0, 4, 'hs_field_name');
        });
    }, function fail() {
        test.assertExists("select[name='field_name[0]']", "Assert 'Please select a field name' exist.");
    });

    casper.waitForSelector("select[name='field_name[1]']", function success() {
        this.evaluate(function () {
            document.querySelector('select[name="field_name[1]"]').value = "do_not_email";
        });
    }, function fail() {
        test.assertExists("select[name='field_name[1]']", "Assert contact info options exist.");
    });

    casper.waitForSelector("input[name='label']", function success() {
        this.sendKeys("input[name='label']", "Do Not Email");
    }, function fail() {
        test.assertExists("input[name='label']", "Assert 'Field Label' field exist.");
    });

    casper.waitForSelector("input[value='Save and New']", function success() {
        this.click("input[value='Save and New']");
    }, function fail() {
        test.assertExists("input[value='Save and New']", "Assert 'Save and New' button exist.");
    });

    casper.wait(1000);

    casper.then(function() {
        casper.echo("Step 2-12: Add Contact info: Image Url.");
    });

    casper.waitForSelector("select[name='field_name[0]']", function success() {
        this.evaluate(function () {
            document.querySelector('select[name="field_name[0]"]').value = "Contact";
            var s = document.querySelector('select[name="field_name[0]"]');
            swapOptions(s.form, 'field_name', 0, 4, 'hs_field_name');
        });
    }, function fail() {
        test.assertExists("select[name='field_name[0]']", "Assert 'Please select a field name' exist.");
    });

    casper.waitForSelector("select[name='field_name[1]']", function success() {
        this.evaluate(function () {
            document.querySelector('select[name="field_name[1]"]').value = "image_URL";
        });
    }, function fail() {
        test.assertExists("select[name='field_name[1]']", "Assert contact info options exist.");
    });

    casper.waitForSelector("input[name='label']", function success() {
        this.sendKeys("input[name='label']", "Image Url");
    }, function fail() {
        test.assertExists("input[name='label']", "Assert 'Field Label' field exist.");
    });

    casper.waitForSelector("input[value='Save and New']", function success() {
        this.click("input[value='Save and New']");
    }, function fail() {
        test.assertExists("input[value='Save and New']", "Assert 'Save and New' button exist.");
    });

    casper.wait(1000);

    casper.then(function() {
        casper.echo("Step 2-13: Add Contact info: Note(s).");
    });

    casper.waitForSelector("select[name='field_name[0]']", function success() {
        this.evaluate(function () {
            document.querySelector('select[name="field_name[0]"]').value = "Contact";
            var s = document.querySelector('select[name="field_name[0]"]');
            swapOptions(s.form, 'field_name', 0, 4, 'hs_field_name');
        });
    }, function fail() {
        test.assertExists("select[name='field_name[0]']", "Assert 'Please select a field name' exist.");
    });

    casper.waitForSelector("select[name='field_name[1]']", function success() {
        this.evaluate(function () {
            document.querySelector('select[name="field_name[1]"]').value = "note";
        });
    }, function fail() {
        test.assertExists("select[name='field_name[1]']", "Assert contact info options exist.");
    });

    casper.waitForSelector("input[name='label']", function success() {
        this.sendKeys("input[name='label']", "Note(s)");
    }, function fail() {
        test.assertExists("input[name='label']", "Assert 'Field Label' field exist.");
    });

    casper.waitForSelector("input[value='Save and New']", function success() {
        this.click("input[value='Save and New']");
    }, function fail() {
        test.assertExists("input[value='Save and New']", "Assert 'Save and New' button exist.");
    });

    casper.wait(1000);

    casper.then(function() {
        // this.capture("add_fields_done.png");
    });

    casper.then(function() {
        casper.echo('=====================================');
        casper.echo('** Step 3: Check All Fields Exists. **');
        casper.echo('=====================================');
    });

    casper.thenOpen(baseURL + "civicrm/admin/uf/group?reset=1", function() {
    });

    var profile_id = '-1';
    casper.waitForSelector("#option11", function success() {
        profile_id = this.evaluate(function (profile_name) {
            var tr_list = document.querySelectorAll("#option11 tr");
            for(var i=1; i<tr_list.length; i++) {
                if(tr_list[i].querySelector('td:first-child span').textContent == profile_name) {
                    return tr_list[i].querySelector('td:nth-child(3)').textContent;
                }
            }
        }, profile_name);
        test.assertNotEquals(profile_id, '-1', 'Got profile id.');
    }, function fail() {
        test.assertExists("#option11", "Assert profile list exist.");
    });

    casper.then(function() {
        var preview_selector = "#UFGroup-" + profile_id + " a:nth-child(3)";
        casper.waitForSelector(preview_selector, function success() {
            this.click(preview_selector);
        }, function fail() {
            test.assertExists(preview_selector);
        });
    });

    casper.wait(2000);
    
    casper.waitForSelector("table.form-layout-compressed", function success() {
        var assert_exist_field_names = ['First Name', 'Last Name', 'Legal Identifier', 'Current Employer', 'Phone', 'State', 'City', 'Postal Code', 'Street Address', 'Email', 'Do Not Email', "Image Url", 'Note(s)'];
        var field_names = this.evaluate(function () {
            var fields = document.querySelectorAll('table.form-layout-compressed tr');
            var field_names = [];
            for(var i=0; i<fields.length; i++) {
                field_names.push(fields[i].querySelector('td').textContent);
            };
            return field_names;
        });
        for(var i=0; i<assert_exist_field_names.length; i++) {
            var field_exist = false;
            for(var j=0; j<field_names.length; j++){
                if(field_names[j] == assert_exist_field_names[i]){
                    field_exist = true;
                    break;
                }
            }
            if(!field_exist) {
                test.error("Field '" + assert_exist_field_names[i] + "' had not been added.");
            } else {
                test.pass("Field '" + assert_exist_field_names[i] + "' had been added.")
            }
        }
    }, function fail() {
        test.assertExists("table.form-layout-compressed", "Assert fields table exist.");
    });

    casper.then(function() {
        casper.echo('=====================================');
        casper.echo('** Step 4: Check If "Publish Online Profile" Work. **');
        casper.echo('=====================================');
    });

    casper.thenOpen(baseURL + "civicrm/admin/uf/group?reset=1", function() {
    });

    casper.then(function() {
        var more = '#more_' + profile_id;
        casper.waitForSelector(more, function success() {
            this.click(more);
        }, function fail() {
            test.assertExists(more, "Assert 'more' exist.");
        });

        var publish = '#panel_more_' + profile_id + ' a';
        casper.waitForSelector(publish, function success() {
            this.click(publish);
        }, function fail() {
            test.assertExists(publish, "'Publish Onlne Profile' exist.");
        });
    });

    casper.wait(2000);

    var profile_url = "";
    casper.waitForSelector("input[name='link_url']", function success() {
        var publish_url = this.evaluate(function () {
            return document.querySelector('input[name="link_url"]').value;
        });
        var split_publish_url = publish_url.split('/');
        publish_url = split_publish_url.slice(3).join('/');
        test.assertEquals(publish_url, 'civicrm/profile/create?gid='+ profile_id + '&reset=1', "Assert 'Publish Online Profile' URL correct.");
        profile_url = 'civicrm/profile/create?gid='+ profile_id + '&reset=1';
    }, function fail() {
        test.assertExists("input[name='link_url']", "Assert 'Link' field exist.");
    });

    casper.then(function() {
        casper.echo('=====================================');
        casper.echo('** Step 5: Check All Field Exist On Public Page. **');
        casper.echo('=====================================');
    });

    // Notation: if not write in then function, profile_url will be empty.
    casper.then(function() {
        casper.thenOpen(baseURL + profile_url, function() {
        });
    });

    casper.waitForSelector("#Edit", function success() {
        var assert_exist_field_names = ['First Name', 'Last Name', 'Legal Identifier', 'Current Employer', 'Phone', 'State', 'City', 'Postal Code', 'Street Address', 'Email', 'Do Not Email', "Image Url", 'Note(s)'];
        var field_names = this.evaluate(function () {
            var label_div = document.querySelectorAll('#Edit .form-layout-compressed .label');
            var field_names = [];
            for(var i=0; i<label_div.length; i++) {
                field_names.push(label_div[i].textContent);
            };
            return field_names;
        });
        for(var i=0; i<assert_exist_field_names.length; i++) {
            var field_exist = false;
            for(var j=0; j<field_names.length; j++){
                if(field_names[j] == assert_exist_field_names[i]){
                    field_exist = true;
                    break;
                }
            }
            if(!field_exist) {
                test.error("Field '" + assert_exist_field_names[i] + "' not exist in public profile.");
            } else {
                test.pass("Field '" + assert_exist_field_names[i] + "' exist in public profile.")
            }
        }
    }, function fail() {
        test.assertExists("#Edit", "Profile form exist.");
    });    

    casper.then(function() {
        test.assertDoesntExist('.error-ci', 'page have no error');
    });

    casper.then(function() {
        casper.echo('=====================================');
        casper.echo('** Step 6: Input Data to Profile Form. **');
        casper.echo('=====================================');
    });

    var first_name = makeid(5);
    var last_name = makeid(5);
    var legal_identifier = makeid(5);
    var current_employer = makeid(5);
    var phone = makeid(5);
    var city = makeid(5);
    var postal_code = makeid(5);
    var street_address = makeid(5);
    var email = makeid(5) + '@test.com';
    var note = makeid(5);
    casper.waitForSelector("input[name='first_name']", function success() {
        this.echo('Step 6-1: Input first name.')
        this.sendKeys("input[name='first_name']", first_name);
    }, function fail() {
        test.assertExists("input[name='first_name']", "'First Name' field exist.");
    });
    
    casper.waitForSelector("input[name='last_name']", function success() {
        this.echo('Step 6-2: Input last name.')
        this.sendKeys("input[name='last_name']", last_name);
    }, function fail() {
        test.assertExists("input[name='last_name']", "'Last Name' field exist.");
    });

    casper.waitForSelector("input[name='legal_identifier']", function success() {
        this.echo('Step 6-3: Input legal identifier.')
        this.sendKeys("input[name='legal_identifier']", legal_identifier);
    }, function fail() {
        test.assertExists("input[name='legal_identifier']", "'Legal Identifier' field exist.");
    });

    casper.waitForSelector("input[name='current_employer']", function success() {
        this.echo('Step 6-4: Input current employer.')
        this.sendKeys("input[name='current_employer']", current_employer);
    }, function fail() {
        test.assertExists("input[name='current_employer']", "'Current Employer' field exist.");
    });

    casper.waitForSelector("input[name='phone-Primary']", function success() {
        this.echo('Step 6-5: Input phone.')
        this.sendKeys("input[name='phone-Primary']", phone);
    }, function fail() {
        test.assertExists("input[name='phone-Primary']", "'Phone' field exist.");
    });

    casper.waitForSelector("select[name='state_province-Primary']", function success() {
        this.echo('Step 6-6: Input state')
        this.evaluate(function () {
            document.getElementById("state_province-Primary").selectedIndex = 1;
        });
    }, function fail() {
        test.assertExists("select[name='state_province-Primary']", "'State' field exist.");
    });

    casper.waitForSelector("input[name='city-Primary']", function success() {
        this.echo('Step 6-7: Input city.')
        this.sendKeys("input[name='city-Primary']", city);
    }, function fail() {
        test.assertExists("input[name='city-Primary']", "'City' field exist.");
    });

    casper.waitForSelector("input[name='postal_code-Primary']", function success() {
        this.echo('Step 6-8: Input postal code.')
        this.sendKeys("input[name='postal_code-Primary']", postal_code);
    }, function fail() {
        test.assertExists("input[name='postal_code-Primary']", "'Postal Code' field exist.");
    });

    casper.waitForSelector("input[name='street_address-Primary']", function success() {
        this.echo('Step 6-9: Input street address.')
        this.sendKeys("input[name='street_address-Primary']", street_address);
    }, function fail() {
        test.assertExists("input[name='street_address-Primary']", "'Street Address' field exist.");
    });

    casper.waitForSelector("input[name='email-Primary']", function success() {
        this.echo('Step 6-10: Input email.')
        this.sendKeys("input[name='email-Primary']", email);
    }, function fail() {
        test.assertExists("input[name='email-Primary']", "'Email' field exist.");
    });

    casper.waitForSelector("input[name='do_not_email']", function success() {
        this.echo('Step 6-11: Input do not email.')
        this.click("input[name='do_not_email']")
    }, function fail() {
        test.assertExists("input[name='do_not_email']", "'Do Not Email' field exist.");
    });

    casper.waitForSelector("textarea[name='note']", function success() {
        this.echo('Step 6-12: Input note(s).')
        this.sendKeys("textarea[name='note']", note);
    }, function fail() {
        test.assertExists("textarea[name='note']", "'Note(s)' field exist.");
    });

    casper.waitForSelector("input[value='Submit >> ']", function success() {
        this.click("input[value='Submit >> ']");
    }, function fail() {
        test.assertExists("input[value='Submit >> ']", "'Submit >> ' button exist.");
    });

    casper.wait(2000);

    casper.then(function() {
        test.assertDoesntExist('.error-ci', 'page have no error');
    });

    casper.then(function() {
        casper.echo('=====================================');
        casper.echo('** Step 7: Check If Data of New Contact Correct. **');
        casper.echo('=====================================');
    });

    casper.then(function() {
        casper.echo("Step 7-1: Search for new contact.");
    });

    casper.thenOpen(baseURL + "civicrm/contact/search?reset=1", function() {
    });

    casper.waitForSelector("#sort_name", function success() {
        this.sendKeys("#sort_name", first_name + " " + last_name);
    }, function fail() {
        test.assertExists("#sort_name", "'Name, Phone or Email' field exist.");
    });

    casper.waitForSelector("#_qf_Basic_refresh", function success() {
        this.click("#_qf_Basic_refresh");
    }, function fail() {
        test.assertExists("#_qf_Basic_refresh", "'Search' button exist.");
    });

    casper.wait(2000);

    casper.then(function() {
        casper.echo("Step 7-2: Go to new contact page.");
    });

    casper.waitForSelector("table.selector tbody tr td.crm-search-display_name a", function success() {
        this.click("table.selector tbody tr td.crm-search-display_name a");
    }, function fail() {
        test.assertExists("table.selector tbody tr td.crm-search-display_name a", "New contact exist.");
    });

    casper.wait(2000);

    // var assert_exist_field_names = ['First Name', 'Last Name', 'Legal Identifier', 'Current Employer', 'Phone', 'State', 'City', 'Postal Code', 'Street Address', 'Email', 'Do Not Email', "Image Url", 'Note(s)'];

    casper.waitForSelector("#page-title", function success() {
        var name = this.evaluate(function () {
            return document.getElementById('page-title').textContent.trim();
        });
        test.assertEquals(name, first_name + ' ' + last_name, 'First Name and Last Name correct.');
    }, function fail() {
        test.assertExists("#page-title", "Contact name exist.");
    });

    casper.waitForSelector("#record-log div", function success() {
        var legal_identifier_from_page = this.evaluate(function () {
            var s = document.querySelector('#record-log div').textContent.trim();
            return s.slice(21 + 'Legal Identifier:'.length + 1);
        });
        test.assertEquals(legal_identifier_from_page, legal_identifier, 'Legal Identifier correct.')
    }, function fail() {
        test.assertExists("#record-log div", "Legal Identifier exist.");
    });

    casper.run(function() {
        test.done();
    });
});
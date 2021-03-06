{*
 +--------------------------------------------------------------------+
 | CiviCRM version 4.1                                                |
 +--------------------------------------------------------------------+
 | Copyright CiviCRM LLC (c) 2004-2011                                |
 +--------------------------------------------------------------------+
 | This file is a part of CiviCRM.                                    |
 |                                                                    |
 | CiviCRM is free software; you can copy, modify, and distribute it  |
 | under the terms of the GNU Affero General Public License           |
 | Version 3, 19 November 2007 and the CiviCRM Licensing Exception.   |
 |                                                                    |
 | CiviCRM is distributed in the hope that it will be useful, but     |
 | WITHOUT ANY WARRANTY; without even the implied warranty of         |
 | MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.               |
 | See the GNU Affero General Public License for more details.        |
 |                                                                    |
 | You should have received a copy of the GNU Affero General Public   |
 | License and the CiviCRM Licensing Exception along                  |
 | with this program; if not, contact CiviCRM LLC                     |
 | at info[AT]civicrm[DOT]org. If you have questions about the        |
 | GNU Affero General Public License or the licensing of CiviCRM,     |
 | see the CiviCRM license FAQ at http://civicrm.org/licensing        |
 +--------------------------------------------------------------------+
*}
<div class="crm-block crm-form-block crm-mailing-test-form-block">
{include file="CRM/common/WizardHeader.tpl"}
<div id="help">
    {ts}It's a good idea to test your mailing by sending it to yourself and/or a selected group of people in your organization. You can also view your content by clicking (+) Preview Mailing.{/ts} {help id="test-intro"}
</div>

{include file="CRM/Mailing/Form/Count.tpl"}

<fieldset>
  <legend>{ts}Test Mailing:{/ts}</legend>
  <table class="form-layout">
    <tr class="crm-mailing-test-form-block-test_email">
    <td class="label">{$form.test_email.label}</td>
    <td>{$form.test_email.html} <div class="description">{ts}Enter e-mail address of recipient. (Use a comma to separate multiple e-mail addresses.){/ts}</div></td>
    </tr>
    <tr class="crm-mailing-test-form-block-test_group"><td class="label">{$form.test_group.label}</td><td>{$form.test_group.html}</td></tr>
    <tr><td></td><td>{$form.sendtest.html}</td>  
  </table>
</fieldset>

<div class="crm-accordion-wrapper crm-plain_text_email-accordion crm-accordion-open">
    <div class="crm-accordion-header">
        <div class="zmdi crm-accordion-pointer"></div> 
        {ts}Preview Mailing{/ts}
    </div><!-- /.crm-accordion-header -->
    <div class="crm-accordion-body">
        <ul class="crm-test-mail-preview">
          <li><button type="button" data-type="normal">{ts}Normal{/ts}</button></li>
          <li><button class="is-active" type="button" data-type="mobile">{ts}Mobile Device{/ts}</button></li>
        </ul>
        <table class="form-layout">
          <tr class="crm-mailing-test-form-block-subject"><td class="label">{ts}Subject:{/ts}</td><td>{$subject}</td></tr>
    {if $preview.attachment}
          <tr class="crm-mailing-test-form-block-attachment"><td class="label">{ts}Attachment(s):{/ts}</td><td>{$preview.attachment}</td></tr>
    {/if}
          {if $preview.text_link}
          <tr><td class="label">{ts}Text Version:{/ts}</td><td><div class="crm-test-mail-preview-frame-wrapper" data-mode="mobile"><iframe class="crm-test-mail-preview-frame" height="300" src="{$preview.text_link}" width="80%"><a href="{$preview.text_link}" onclick="window.open(this.href); return false;">{ts}Text Version{/ts}</a></iframe></div></td></tr>
          {/if}
          {if $preview.html_link}
          <tr><td class="label">{ts}HTML Version:{/ts}</td><td><div class="crm-test-mail-preview-frame-wrapper" data-mode="mobile"><iframe class="crm-test-mail-preview-frame" height="300" src="{$preview.html_link}" width="80%"><a href="{$preview.html_link}" onclick="window.open(this.href); return false;">{ts}HTML Version{/ts}</a></iframe></div></td></tr>
          {/if}
        </table>
    </div><!-- /.crm-accordion-body -->
</div><!-- /.crm-accordion-wrapper -->    

<div class="crm-submit-buttons">{include file="CRM/common/formButtons.tpl"}</div>
    
</div><!-- / .crm-form-block -->

{* include jscript to warn if unsaved form field changes *}
{include file="CRM/common/formNavigate.tpl"}
{literal}
<script type="text/javascript">
cj(function() {
   cj().crmaccordions();

  cj(".crm-test-mail-preview").on("click", "button", function(e) {
    var $btn = cj(this),
        type = $btn.data("type"),
        $container = $btn.closest(".crm-test-mail-preview"),
        $btns = $container.find("button"),
        $previewFrameWrapper = cj(".crm-test-mail-preview-frame-wrapper"),
        activeClass = "is-active";

    $btns.removeClass(activeClass);

    if ($btn.hasClass(activeClass)) {
      $btn.removeClass(activeClass);
    }
    else {
      $btn.addClass(activeClass);
    }

    if ($previewFrameWrapper.length) {
      $previewFrameWrapper.attr("data-mode", type);
    }
  });
});
</script>
{/literal}


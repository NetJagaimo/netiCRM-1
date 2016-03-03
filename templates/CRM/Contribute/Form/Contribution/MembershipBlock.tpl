{*
 +--------------------------------------------------------------------+
 | CiviCRM version 3.3                                                |
 +--------------------------------------------------------------------+
 | Copyright CiviCRM LLC (c) 2004-2010                                |
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
{if $membershipBlock}
<div id="membership" class="crm-group membership-group">
  {if $context EQ "makeContribution"}
  <fieldset>    
      {if $renewal_mode }
        {if $membershipBlock.renewal_title}
            <legend>{$membershipBlock.renewal_title}</legend>
        {/if}
        {if $membershipBlock.renewal_text}
            <div id="membership-intro" class="crm-section membership_renewal_intro-section">
                <p>{$membershipBlock.renewal_text}</p>
            </div> 
        {/if}

      {else}        
        {if $membershipBlock.new_title}
            <legend>{$membershipBlock.new_title}</legend>
        {/if}
        {if $membershipBlock.new_text}
            <div id="membership-intro" class="crm-section membership_new_intro-section">
                <p>{$membershipBlock.new_text}</p>
            </div> 
        {/if}
      {/if}
  {/if}
  {if  $context neq "makeContribution" }
        <div class="header-dark">
            {if $renewal_mode }
                    {if $membershipBlock.renewal_title}
                        {$membershipBlock.renewal_title}
                    {else}
                        {ts}Select a Membership Renewal Level{/ts}
                    {/if}

            {else}
                    {if $membershipBlock.new_title}
                        {$membershipBlock.new_title}
                    {else}
                        {ts}Select a Membership Level{/ts}
                    {/if}
            {/if}
        </div>
    {/if}
   
    {strip}
        <table id="membership-listings">
        {foreach from=$membershipTypes item=row }
        <tr {if $context EQ "makeContribution" OR $context EQ "thankContribution" }class="odd-row" {/if}valign="top">
           <td style="width: auto;">
                <label class="crm-form-elem crm-form-radio">
                {if $showRadio }
                  {assign var="pid" value=$row.id}
                  {$form.selectMembership.$pid.html}
                {/if}
                {$row.name}
                {if ($membershipBlock.display_min_fee AND $context EQ "makeContribution") AND $row.minimum_fee GT 0 }
                    {if $is_separate_payment OR ! $form.amount.label}
                      ( {$row.minimum_fee|crmMoney} )
                    {else}
                      {ts 1=$row.minimum_fee|crmMoney}(contribute at least %1 to be eligible for this membership){/ts}
                    {/if}
                {/if}
                </label>
                <span class="description">{$row.description}</spann>
           </td>
            
            <td style="width: auto;">
              {* Check if there is an existing membership of this type (current_membership NOT empty) and if the end-date is prior to today. *}
              {if $row.current_membership AND $context EQ "makeContribution" }
                    {if $row.current_membership|date_format:"%Y%m%d" LT $smarty.now|date_format:"%Y%m%d"}
                        <br /><em>{ts 1=$row.current_membership|crmDate 2=$row.name}Your <strong>%2</strong> membership expired on %1.{/ts}</em>
                    {else}
                        <br /><em>{ts 1=$row.current_membership|crmDate 2=$row.name}Your <strong>%2</strong> membership expires on %1.{/ts}</em>
                    {/if}
              {else}
                &nbsp;
              {/if}
           </td> 
        </tr>
        
        {/foreach}
        {if $showRadio}
            {if $showRadioNoThanks } {* Provide no-thanks option when Membership signup is not required - per membership block configuration. *}
            <tr class="odd-row">
              <td colspan="2">
                <label class="crm-form-elem crm-form-radio">
                  {$form.selectMembership.no_thanks.html}
                  {ts}No thank you{/ts}
                </label>
              </td>
            </tr> 
            {/if}
        {/if}          
        </table>
    {/strip}
    {if $context EQ "makeContribution"}
        </fieldset>
    {/if}
</div>
{/if}

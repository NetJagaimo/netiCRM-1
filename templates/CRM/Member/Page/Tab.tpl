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
<div class="view-content">
{if $action eq 1 or $action eq 2 or $action eq 8} {* add, update or delete *}              
    {include file="CRM/Member/Form/Membership.tpl"}
{elseif $action eq 4}
    {include file="CRM/Member/Form/MembershipView.tpl"}
{elseif $action eq 32768}  {* renew *}
    {include file="CRM/Member/Form/MembershipRenewal.tpl"}
{elseif $action eq 16} {* Browse memberships for a contact *}
    {if $permission EQ 'edit'}{capture assign=newURL}{crmURL p="civicrm/contact/view/membership" q="reset=1&action=add&cid=`$contactId`&context=membership"}{/capture}{/if}

    {if $action ne 1 and $action ne 2 and $permission EQ 'edit'}
        <div id="help">
            {if $permission EQ 'edit'}
                {ts 1=$newURL}Click <a href='%1'>Add Membership</a> to record a new membership.{/ts}
	            {if $newCredit}	
                    {capture assign=newCreditURL}{crmURL p="civicrm/contact/view/membership" q="reset=1&action=add&cid=`$contactId`&context=membership&mode=live"}{/capture}
                    {ts 1=$newCreditURL}Click <a href='%1'>Submit Credit Card Membership</a> to process a Membership on behalf of the member using their credit card.{/ts}
                {/if}
            {else}
                {ts 1=$displayName}Current and inactive memberships for %1 are listed below.{/ts}
            {/if}
        </div>

        <div class="action-link-button">
            <a accesskey="N" href="{$newURL}" class="button"><span><i class="zmdi zmdi-plus-circle-o"></i>{ts}Add Membership{/ts}</span></a>
            {if $accessContribution and $newCredit}
                <a accesskey="N" href="{$newCreditURL}" class="button"><span><i class="zmdi zmdi-plus-circle-o"></i>{ts}Submit Credit Card Membership{/ts}</span></a><br /><br />
            {else}
                <br/ ><br/ >
            {/if}
        </div>
    {/if}
    {if NOT ($activeMembers or $inActiveMembers) and $action ne 2 and $action ne 1 and $action ne 8 and $action ne 4 and $action ne 32768}
       	<div class="messages status">
          
              {ts}No memberships have been recorded for this contact.{/ts}
         </div>
    {/if}
    {include file="CRM/common/jsortable.tpl"}
    {if $activeMembers}
    <div id="memberships">
        <h3>{ts}Active Memberships{/ts}</h3>
        {strip}
        <table id="active_membership" class="display">
            <thead>
            <tr>
                <th>{ts}Membership Type{/ts}</th>
                <th>{ts}Join Date{/ts}</th>
                <th>{ts}Start Date{/ts}</th>
                <th>{ts}End Date{/ts}</th>
                <th>{ts}Reminder Date{/ts}</th>
                <th>{ts}Status{/ts}</th>
                <th>{ts}Source{/ts}</th>
                <th></th>
            </tr>
            </thead>
            {foreach from=$activeMembers item=activeMember}
            <tr id="crm-membership_{$activeMember.id}" class="{cycle values="odd-row,even-row"} {$activeMember.class} crm-membership">
                <td class="crm-membership-membership_type">
                    {$activeMember.membership_type}
                    {if $activeMember.owner_membership_id}<br />({ts}by relationship{/ts}){/if}
                </td>
                <td class="crm-membership-join_date">{$activeMember.join_date|crmDate}</td>
                <td class="crm-membership-start_date">{$activeMember.start_date|crmDate}</td>
                <td class="crm-membership-end_date">{$activeMember.end_date|crmDate}</td>
                <td class="crm-membership-reminder_date">{$activeMember.reminder_date|crmDate}</td>
                <td class="crm-membership-status">{$activeMember.status}</td>
                <td class="crm-membership-source">{$activeMember.source}</td>
                <td>
                    {$activeMember.action|replace:'xx':$activeMember.id}
                    {if $activeMember.owner_membership_id}
                        &nbsp;|&nbsp;<a href="{crmURL p='civicrm/membership/view' q="reset=1&id=`$activeMember.owner_membership_id`&action=view&context=membership&selectedChild=member"}" title="{ts}View Primary member record{/ts}">{ts}View Primary{/ts}</a>
                    {/if}
                </td>
            </tr>
            {/foreach}
        </table>
        {/strip}
    </div>
    {/if}

    {if $inActiveMembers}
        <div id="inactive-memberships">
        <p></p>
        <h3 class="font-red">{ts}Pending and Inactive Memberships{/ts}</h3>
        {strip}
        <table id="pending_membership" class="display">
            <thead>
            <tr>
                <th>{ts}Membership Type{/ts}</th>
                <th>{ts}Join Date{/ts}</th>
                <th>{ts}Start Date{/ts}</th>
                <th>{ts}End Date{/ts}</th>
                <th>{ts}Reminder Date{/ts}</th>
                <th>{ts}Status{/ts}</th>
                <th>{ts}Source{/ts}</th>
                <th></th>
            </tr>
            </thead>
            {foreach from=$inActiveMembers item=inActiveMember}
            <tr id="crm-membership_{$inActiveMember.id}" class="{cycle values="odd-row,even-row"} {$inActiveMember.class} crm-membership">
                <td class="crm-membership-membership_type">{$inActiveMember.membership_type}</td>
                <td class="crm-membership-join_date">{$inActiveMember.join_date|crmDate}</td>
                <td class="crm-membership-start_date">{$inActiveMember.start_date|crmDate}</td>
                <td class="crm-membership-end_date">{$inActiveMember.end_date|crmDate}</td>
                <td class="crm-membership-reminder_date">{$inActiveMember.reminder_date|crmDate}</td>
                <td class="crm-membership-status">{$inActiveMember.status}</td>
                <td class="crm-membership-source">{$inActiveMember.source}</td>
                <td>{$inActiveMember.action|replace:'xx':$inActiveMember.id}</td>
            </tr>
            {/foreach}
        </table>
        {/strip}
        </div>
    {/if}

    {if $membershipTypes}
    <div class="solid-border-bottom">&nbsp;</div>
    <div id="membership-types">
        <div><label>{ts}Membership Types{/ts}</label></div>
        <div class="help">
            {ts}The following Membership Types are associated with this organization. Click <strong>Members</strong> for a listing of all contacts who have memberships of that type. Click <strong>Edit</strong> to modify the settings for that type.{/ts}
        <div class="form-item">
            {strip}
            <table id="membership_type" class="display">
            <thead>
            <tr>
                <th>{ts}Name{/ts}</th>
                <th>{ts}Period{/ts}</th>
                <th>{ts}Fixed Start{/ts}</th>		
                <th>{ts}Minimum Fee{/ts}</th>
                <th>{ts}Duration{/ts}</th>            
                <th>{ts}Visibility{/ts}</th>
                <th></th> 
            </tr>
            </thead>
            {foreach from=$membershipTypes item=membershipType}
            <tr class="{cycle values="odd-row,even-row"} {$membershipType.class} crm-membership">
                <td class="crm-membership-name">{$membershipType.name}</td>
                <td class="crm-membership-period_type">{$membershipType.period_type}</td>
                <td class="crm-membership-fixed_period_start_day">{$membershipType.fixed_period_start_day}</td>
                <td class="crm-membership-minimum_fee">{$membershipType.minimum_fee}</td>
                <td class="crm-membership-duration_unit">{$membershipType.duration_unit}</td>	        
                <td class="crm-membership-visibility">{$membershipType.visibility}</td>
                <td>{$membershipType.action|replace:xx:$membershipType.id}</td>
            </tr>
            {/foreach}
            </table>
            {/strip}

        </div>
    </div>
    {/if}
{/if} {* End of $action eq 16 - browse memberships. *}

{if $action eq 4}
<div class="crm-accordion-wrapper crm-membership_log-accordion {if $memberLog_rows}crm-accordion-closed{else}crm-accordion-open{/if}">
 <div class="crm-accordion-header crm-master-accordion-header">
  <div class="zmdi crm-accordion-pointer"></div>{ts}Membership Log{/ts}</div>
        <!-- /.crm-accordion-header -->
        <div class="crm-accordion-body">

          <!-- From templates/CRM/Member/Form/Selector.tpl-->
        <table class="selector">
        <thead class="sticky">
          {foreach from=$memberLog_columnHeaders item=header}
            <th scope="col">
            {if $header.sort}
              {assign var='key' value=$header.sort}
              {$memberLog_sort->_response.$key.link}
            {else}
              {$header.name}
            {/if}
            </th>
          {/foreach}
          </thead>

          {counter start=0 skip=1 print=false}
          {foreach from=$memberLog_rows item=row}
          <tr id='rowid{$row.id}' class="{cycle values="odd-row,even-row"} crm-id_{$row.id}">
            <td class="crm-membership-status_id crm-membership-status_id_{$row.status_id}">
                {$row.status}
            </td>
            <td class="crm-membership-start_date">{$row.start_date|truncate:10:''|crmDate}</td>
            <td class="crm-membership-end_date">{$row.end_date|truncate:10:''|crmDate}</td>
            <td class="crm-membership-modified_by">
                {if $row.modified_by}
                    <a href="{crmURL p='civicrm/contact/view' q="reset=1&cid=`$row.modified_id`"}">{$row.modified_by}</a>
                {else}
                    {$row.modified_id}
                {/if}
            </td>
            <td class="crm-membership-modified_date">{$row.modified_date|truncate:10:''|crmDate}</td>
            <td class="crm-membership-renewal_reminder_date">{$row.renewal_reminder_date|truncate:10:''|crmDate}</td>
           </tr>
          {/foreach}
        </table>

        </div>
        <!-- /.crm-accordion-body -->
      </div>
{/if}


</div>

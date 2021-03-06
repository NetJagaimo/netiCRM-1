<?php
class CRM_Standalone_User {

  public $id;

  public $identity_url;

  public $email;

  public $first_name;

  public $last_name;

  public $name;

  public $street_address;

  public $city;

  public $postal_code;

  public $state_province;

  public $country; function __construct($identityUrl, $email = NULL, $firstName = NULL, $lastName = NULL, $streetAddr = NULL, $city = NULL, $postalCode = NULL, $stateProvince = NULL, $country = NULL) {
    $this->identity_url = $identityUrl;
    $this->email = $email;
    $this->first_name = $firstName;
    $this->last_name = $lastName;
    $this->name = $firstName . ' ' . $lastName;
    $this->street_address = $streetAddr;
    $this->city = $city;
    $this->postal_code = $postalCode;
    $this->state_province = $stateProvince;
    $this->country = $country;
  }
}


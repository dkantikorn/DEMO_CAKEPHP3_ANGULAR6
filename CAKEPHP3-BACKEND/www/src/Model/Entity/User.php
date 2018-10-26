<?php

namespace App\Model\Entity;

use Cake\ORM\Entity;
use Cake\Auth\DefaultPasswordHasher;

/**
 * User Entity
 *
 * @property int $id
 * @property string $username
 * @property string $password
 * @property string $nameprefix
 * @property string $firstname
 * @property string $lastname
 * @property string $gender
 * @property \Cake\I18n\FrozenDate $birthdate
 * @property string $moblie
 * @property string $phone
 * @property string $email
 * @property string $profile_img_path
 * @property string $status
 * @property int $create_uid
 * @property int $update_uid
 * @property \Cake\I18n\FrozenTime $created
 * @property \Cake\I18n\FrozenTime $modified
 */
class User extends Entity {

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * Note that when '*' is set to true, this allows all unspecified fields to
     * be mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove it), and explicitly make individual fields accessible as needed.
     *
     * @var array
     */
    protected $_accessible = [
        'username' => true,
        'password' => true,
        'first_name' => true,
        'last_name' => true,
        'gender' => true,
        'birth_date' => true,
        'moblie' => true,
        'phone' => true,
        'email' => true,
        'picture_path' => true,
        'status' => true,
        'create_uid' => true,
        'update_uid' => true,
        'created' => true,
        'modified' => true
    ];

    /**
     * Fields that are excluded from JSON versions of the entity.
     *
     * @var array
     */
    protected $_hidden = [
        'password'
    ];

    /**
     * 
     * Function trigger save database
     * @author sarawutt.b
     * @param type $password
     * @return type
     */
    protected function _setPassword($password) {
        if (strlen($password) > 0) {
            return (new DefaultPasswordHasher)->hash($password);
        }
    }

}

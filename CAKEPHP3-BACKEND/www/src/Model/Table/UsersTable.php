<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Users Model
 *
 * @method \App\Model\Entity\User get($primaryKey, $options = [])
 * @method \App\Model\Entity\User newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\User[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\User|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\User patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\User[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\User findOrCreate($search, callable $callback = null, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class UsersTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('users');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator)
    {
//        $validator
//            ->allowEmpty('id', 'create');
//
//        $validator
//            ->scalar('username')
//            ->maxLength('username', 100)
//            ->requirePresence('username', 'create')
//            ->notEmpty('username');
//
//        $validator
//            ->scalar('password')
//            ->maxLength('password', 128)
//            ->requirePresence('password', 'create')
//            ->notEmpty('password');
//
//
//        $validator
//            ->scalar('first_name')
//            ->maxLength('first_name', 255)
//            ->requirePresence('first_name', 'create')
//            ->notEmpty('first_name');
//
//        $validator
//            ->scalar('last_name')
//            ->maxLength('last_name', 255)
//            ->requirePresence('last_name', 'create')
//            ->notEmpty('last_name');
//
//        $validator
//            ->scalar('gender')
//            ->maxLength('gender', 1)
//            ->allowEmpty('gender');
//
//        $validator
//            ->date('birthdate')
//            ->allowEmpty('birthdate');
//
//        $validator
//            ->scalar('moblie')
//            ->maxLength('moblie', 40)
//            ->allowEmpty('moblie');
//
//        $validator
//            ->scalar('phone')
//            ->maxLength('phone', 40)
//            ->allowEmpty('phone');
//
//        $validator
//            ->email('email')
//            ->allowEmpty('email');
//
//        $validator
//            ->scalar('picture_path')
//            ->maxLength('picture_path', 512)
//            ->allowEmpty('picture_path');
//
//        $validator
//            ->scalar('status')
//            ->maxLength('status', 1)
//            ->allowEmpty('status');
//
//        $validator
//            ->requirePresence('create_uid', 'create')
//            ->notEmpty('create_uid');
//
//        $validator
//            ->allowEmpty('update_uid');

        return $validator;
    }

    /**
     * Returns a rules checker object that will be used for validating
     * application integrity.
     *
     * @param \Cake\ORM\RulesChecker $rules The rules object to be modified.
     * @return \Cake\ORM\RulesChecker
     */
    public function buildRules(RulesChecker $rules)
    {
//        $rules->add($rules->isUnique(['username']));
//        $rules->add($rules->isUnique(['email']));

        return $rules;
    }
}

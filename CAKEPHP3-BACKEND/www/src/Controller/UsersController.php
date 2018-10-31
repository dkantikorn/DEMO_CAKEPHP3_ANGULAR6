<?php

namespace App\Controller;

use App\Controller\AppController;

/**
 * Users Controller
 *
 * @property \App\Model\Table\UsersTable $Users
 *
 * @method \App\Model\Entity\User[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class UsersController extends AppController {

    public function initialize() {
        parent::initialize();
        $this->Auth->allow();
    }

    public function index() {
        $this->redirect(array('action' => 'loadAllUsers'));
    }

    /**
     * =====================================================================================================================================
     * Users Service Section
     * =====================================================================================================================================
     */

    /**
     * Login function is Autherized valid login
     * @author  Sarawutt.b
     * @return  void
     */
    public function login() {
        $response = [];
        if ($this->request->is('post')) {
            $user = $this->Auth->identify();
            if ($user) {
                $this->Auth->setUser($user);
                $response = ['status' => 'success', 'message' => __('Login successfully'), 'data' => $this->Auth->user(), 'token' => 'jwt-token'];
            } else {
                $response = ['status' => 'failed', 'message' => __('Invalid username or password Please try again!')];
            }
        }

        $this->set(compact('response'));
        $this->set('_serialize', ['response']);
    }

    /**
     * 
     * Function Logout with the API
     * @author sarawutt.b
     */
    public function logout() {
        $this->Session->destroy();
        $rest = array(
            'status' => 'SUCCESS',
            'data' => array(
                'message' => __('Logout successfully'),
                'raw' => array()
            )
        );
        $this->set(array('data' => $rest, '_serialize' => array('message')));
    }

    /**
     * 
     * Function list all user on the system
     * @author sarawutt.b
     */
    public function loadAllUsers() {
        $response = $this->Users->find()->order(['username' => 'asc', 'first_name' => 'asc', 'last_name' => 'asc'])->all();
        $this->set(['response' => $response, '_serialize' => ['response']]);
    }

    /**
     * 
     * Function load a user information whare match parameter id
     * @author  sarawutt.b
     * @param   type $id as a integer of the user ID
     */
    public function findUserByUserId($id = null) {
        $response = [];
        $userInfo = $this->Users->find()->where([$this->Users->primaryKey() => $id]);
        if (!$userInfo->isEmpty()) {
            $response = ['status' => 'success', 'message' => __('Load for user information'), 'data' => $userInfo->first()];
        } else {
            $response = ['status' => 'failed', 'message' => __('User information are not founded!'), 'data' => $userInfo->first()];
        }
        $this->set(compact('response'));
        $this->set('_serialize', ['response']);
    }

    /**
     * 
     * Function add user
     * @author sarawutt.b
     */
    public function addUserProfile() {
        $response = ['message' => __('Initial for add a user profile'), 'status' => 'failed'];
        if ($this->request->is('post')) {
            $params = $this->request->getData();
            if (!($this->Users->exists(['username' => $params['username']]))) {
                $user = $this->Users->newEntity();

                $resultOK = []; //Keep file handler
                $file_path = "";
                $file_path = 'uploadfile/img';
                if (!empty($params['picture_path']['name'])) {
                    $resultOK = $this->uploadFiles(null, $file_path, $params['picture_path']);
                    if (isset($resultOK['errors'])) {
                        $response = ['message' => __("{$resultOK['errors'][0]}. Please, try again."), 'ststus' => 'failed'];
                    }
                }

                $params['picture_path'] = $resultOK['uploadPaths'][0];
                $params['create_uid'] = 999;
                $user = $this->Users->patchEntity($user, $params);
                if ($this->Users->save($user)) {
                    $response = ['message' => __('The user has been saved.'), 'status' => 'success'];
                } else {
                    $response = ['message' => __('The username could not be save. Please try again.'), 'status' => 'failed'];
                }
            } else {
                $response = ['message' => __('The username %s is already exist. Please try again.', $params['username']), 'status' => 'failed'];
            }
        }
        $this->set(compact('response'));
        $this->set('_serialize', ['response']);
    }

    /**
     * 
     * Function update user profile
     * @author sarawutt.b
     * @param type $id as a integer of user id [PK]
     */
    public function updateUserProfile($id = null) {
        $response = ['message' => __('Initial for add a user profile'), 'status' => 'failed'];
        if ($this->request->is(['patch', 'post', 'put'])) {
            $user = $this->Users->get($id, ['contain' => []]);
            if (!empty($user)) {
                $params = $this->request->getData();
                $params['create_uid'] = 999;
                $user = $this->Users->patchEntity($user, $params);
                if ($this->Users->save($user)) {
                    $response = ['message' => __('The user has been saved.'), 'status' => 'success'];
                } else {
                    $response = ['message' => __('The user could not be save. Please try again.'), 'status' => 'failed'];
                }
            } else {
                $response = ['message' => __('The request user not found infomation. Please try again.'), 'status' => 'failed'];
            }
        } else {
            $response = ['message' => __('Not allow request Method you must request to update with POST/PUT/PATCH'), 'status' => 'failed'];
        }
        $this->set(compact('response'));
        $this->set('_serialize', ['response']);
    }

    /**
     * 
     * Function delete for the user profile
     * @author sarawutt.b
     * @param type $id as a integer of a user id [PK]
     * @return json data
     */
    public function deleteUserProfile($id = null) {
        $response = ['message' => __('Initial for add a user profile'), 'status' => 'failed'];
        if ($this->request->is(['post', 'delete'])) {
            $user = $this->Users->get($id);
            if ($this->Users->delete($user)) {
                $response = ['message' => __('The user has been deleted.'), 'status' => 'success'];
            } else {
                $response = ['message' => __('The user could not be deleted. Please, try again.'), 'status' => 'failed'];
            }
        } else {
            $response = ['message' => __('Not allow request Method you must request to update with POST/DELETE'), 'status' => 'failed'];
        }
        $this->set(compact('response'));
        $this->set('_serialize', ['response']);
    }

}

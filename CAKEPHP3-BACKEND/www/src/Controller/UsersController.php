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
//        $message = array('message' => __('METHOD:: PUT Request for update user profile'), 'type' => 'ERROR');
//        $user = json_decode(file_get_contents("php://input"), true);
//        if ($this->request->is('put') && !empty($user)) {
//            $this->User->id = $user['id'];
//            if ($this->User->save($user)) {
//                $message = array('message' => __('The user has been updated.'), 'type' => 'SUCCESS');
//            } else {
//                $message = array('message' => __('The user could not be updated. Please try again !'), 'type' => 'ERROR');
//            }
//        }
//        $this->set(array('data' => $message, '_serialize' => array('data')));
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
        }else{
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
        $message = array(__('deleteUserProfile::API'), 'type' => 'ERROR');
        $this->request->allowMethod('post', 'delete');
        $user = json_decode(file_get_contents("php://input"), true);
        if ($this->request->is('post') && !empty($user)) {
            $this->User->id = $user['id'];
            if (!$this->User->exists()) {
                $message = array(__('Invalid not found user. please try again !'), 'type' => 'ERROR');
            } else {
                if ($this->User->delete()) {
                    $message = array('message' => __('The user has been deleted.'), 'type' => 'SUCCESS');
                } else {
                    $message = array('message' => __('The user could not be deleted. Please try again !'), 'type' => 'ERROR');
                }
            }
        }
        $this->set(array('message' => $message, '_serialize' => array('message')));
    }

    /**
     * 
     * Function making for demo upload file
     * @author sarawutt.b
     */
    public function uploadProfile() {
        $message = array('message' => __('Initial for add a user profile'), 'type' => 'ERROR');
        if ($this->request->is('post')) {
            $resultOK = array();
            $file_path = "";
            $file_path = 'uploadfile/img';
            if (!empty($this->request->data['User']['picture_path']['name'])) {
                $resultOK = $this->uploadFiles($file_path, $this->request->data['User']['picture_path']);
                if (isset($resultOK['errors'])) {
                    $message = array('message' => __("{$resultOK['errors'][0]}. Please, try again."), 'type' => 'ERROR');
                } else {
                    $message = array('message' => __('COMPLETE UPLOADED'), 'type' => 'SUCCESS');
                }
            }
        }
        $this->set(array('message' => $message, '_serialize' => array('message')));
    }

    /**
     * 
     * Function test for RESTFul API
     * @param type $id
     * @return type
     */
    public function users($id = null) {
        //$this->autoRender = false;
//        debug(json_decode(file_get_contents("php://input")));
//        CakeLog::error($id);
//        CakeLog::error(json_encode(json_decode(file_get_contents("php://input"))));
        $user = json_encode(json_decode(file_get_contents("php://input")));
        $this->set(array('user' => $user, '_serialize' => array('user')));

        if ($this->request->is('get')) {
            CakeLog::info('request get from api');
        }

        if ($this->request->is('post')) {
            CakeLog::info('POST');
            $message = array();
            $user = json_decode(file_get_contents("php://input"), true);
            $this->User->id = $user['id'];
            if ($this->User->save($user)) {
                $message = array(
                    'message' => __('The user has been updated.'),
                    'status' => 'SUCCESS'
                );
            } else {
                $message = array(
                    'message' => __('The user could not be updated. Please try again !'),
                    'status' => 'ERROR'
                );
            }

            $this->set(array('data' => $message, '_serialize' => array('data')));
            //CakeLog::info(json_decode(file_get_contents("php://input")));
            //$this->request->data = json_decode(file_get_contents("php://input"), true);
            //debug($user);
        }

        if ($this->request->is('put')) {
            CakeLog::info('PUT');
        }

        if ($this->request->is('ajax')) {
            CakeLog::info('AJAX');
        }

        return;
    }

//    /**
//     * Index method
//     *
//     * @return \Cake\Http\Response|void
//     */
//    public function index() {
//        $users = $this->paginate($this->Users);
//
//        $this->set(compact('users'));
//    }

    /**
     * View method
     *
     * @param string|null $id User id.
     * @return \Cake\Http\Response|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null) {
        $user = $this->Users->get($id, [
            'contain' => []
        ]);

        $this->set('user', $user);
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    public function add() {
        $user = $this->Users->newEntity();
        if ($this->request->is('post')) {
            $user = $this->Users->patchEntity($user, $this->request->getData());
            if ($this->Users->save($user)) {
                $this->Flash->success(__('The user has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The user could not be saved. Please, try again.'));
        }
        $this->set(compact('user'));
    }

    /**
     * Edit method
     *
     * @param string|null $id User id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null) {
        $user = $this->Users->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $user = $this->Users->patchEntity($user, $this->request->getData());
            if ($this->Users->save($user)) {
                $this->Flash->success(__('The user has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The user could not be saved. Please, try again.'));
        }
        $this->set(compact('user'));
    }

    /**
     * Delete method
     *
     * @param string|null $id User id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null) {
        $this->request->allowMethod(['post', 'delete']);
        $user = $this->Users->get($id);
        if ($this->Users->delete($user)) {
            $this->Flash->success(__('The user has been deleted.'));
        } else {
            $this->Flash->error(__('The user could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }

}

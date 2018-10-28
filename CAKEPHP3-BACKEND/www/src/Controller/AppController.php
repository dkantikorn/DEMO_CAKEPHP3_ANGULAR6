<?php

/**
 * CakePHP(tm) : Rapid Development Framework (https://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 * @link      https://cakephp.org CakePHP(tm) Project
 * @since     0.2.9
 * @license   https://opensource.org/licenses/mit-license.php MIT License
 */

namespace App\Controller;

use Cake\Controller\Controller;
use Cake\Event\Event;

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, X-Auth-Token, X-Requested-With');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');

/**
 * Application Controller
 *
 * Add your application-wide methods in the class below, your controllers
 * will inherit them.
 *
 * @link https://book.cakephp.org/3.0/en/controllers.html#the-app-controller
 */
class AppController extends Controller {

    /**
     * Initialization hook method.
     *
     * Use this method to add common initialization code like loading components.
     *
     * e.g. `$this->loadComponent('Security');`
     *
     * @return void
     */
    public function initialize() {
        parent::initialize();

        $this->loadComponent('RequestHandler');
        $this->loadComponent('Flash');

        $this->loadComponent('Auth', [
            'loginRedirect' => ['controller' => 'Home', 'action' => 'index'],
            'logoutRedirect' => ['controller' => 'Users', 'action' => 'login'],
            'loginAction' => ['controller' => 'Users', 'action' => 'login'],
            'authorize' => ['Controller'],
            'authenticate' => [
                'Form' => [
                    'fields' => ['username' => 'username', 'password' => 'password'],
                ]
            ],
            'unauthorizedRedirect' => $this->referer()// If unauthorized, return them to page they were just on
        ]);

        /*
         * Enable the following components for recommended CakePHP security settings.
         * see https://book.cakephp.org/3.0/en/controllers/components/security.html
         */
        //$this->loadComponent('Security');
        //$this->loadComponent('Csrf');
    }

    /**
     *
     * Function used fro generate _VERSION_
     * @author  sarawutt.b
     * @return  biginteger of the version number
     */
    public function VERSION() {
        $parts = explode(' ', microtime());
        $micro = $parts[0] * 1000000;
        return(substr(date('YmdHis'), 2) . sprintf("%06d", $micro));
    }

    /**
     *
     * Function used for generate UUID key patern
     * @author  sarawutt.b
     * @return  string uuid in version
     */
    public function UUID() {
        return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x', mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0x0fff) | 0x4000, mt_rand(0, 0x3fff) | 0x8000, mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff));
    }

    /**
     *
     * This function for uload attachment excel file  from view of information style list
     * @author  sarawutt.b
     * @param   string name of target upload path
     * @param   array() file attribute option from upload form
     * @since   2017/10/30
     * @return  array()
     */
    function uploadFiles($name_file = null, $folder, $file, $itemId = null) {
        $folder_url = WWW_ROOT . $folder;
        $rel_url = $folder;
        if (!is_dir($folder_url)) {
            mkdir($folder_url);
        }
        //Bould new path if $itemId to be not null
        if ($itemId) {
            $folder_url = WWW_ROOT . $folder . '/' . $itemId;
            $rel_url = $folder . '/' . $itemId;
            if (!is_dir($folder_url)) {
                mkdir($folder_url);
            }
        }
        //define for file type where it allow to upload
        $map = [
            'audio/mp3' => '.mp3',
            'video/mp4' => '.mp4',
            'image/bmp' => '.bmp',
            'image/gif' => '.gif',
            'image/jpeg' => '.jpg',
            'image/png' => '.png',
            'application/pdf' => '.pdf',
            'application/msword' => '.doc',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => '.docx',
            'application/excel' => '.xls',
            'application/vnd.ms-excel' => '.xls',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' => '.xlsx'
        ];
        //Bould file extension keep to the database
        $userfile_extn = substr($file['name'], strrpos($file['name'], '.') + 1);
        if (array_key_exists($file['type'], $map)) {
            $typeOK = true;
        }
        //Rename for the file if not change of the upload file makbe duplicate
        if (empty($name_file)) {
            $name_file = $this->VERSION() . $map[$file['type']];
        }

        if ($typeOK) {
            switch ($file['error']) {
                case 0:
                    @unlink($folder_url . '/' . $name_file); //Delete the file if it already existing
                    $full_url = $folder_url . '/' . $name_file;
                    $url = $rel_url . '/' . $name_file;
                    $success = move_uploaded_file($file['tmp_name'], $url);
                    if ($success) {
                        $result['uploadPaths'][] = '/' . $url;
                        $result['uploadFileNames'][] = $name_file;
                        $result['uploadExts'][] = $userfile_extn;
                        $result['uploadOriginFileNames'][] = $file['name'];
                        $result['uploadFileTypes'][] = $file['type'];
                    } else {
                        $result['uploadErrors'][] = __("Error uploaded {$name_file}. Please try again.");
                    }
                    break;
                case 3:
                    $result['uploadErrors'][] = __("Error uploading {$name_file}. Please try again.");
                    break;
                case 4:
                    $result['noFiles'][] = __("No file Selected");
                    break;
                default:
                    $result['uploadErrors'][] = __("System error uploading {$name_file}. Contact webmaster.");
                    break;
            }
        } else {
            $permiss = '';
            foreach ($map as $k => $v) {
                $permiss .= "{$v}, ";
            }
            $result['uploadErrors'][] = __("{$name_file} cannot be uploaded. Acceptable file types in : %s", trim($permiss, ','));
        }
        return $result;
    }

}

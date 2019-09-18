<?php

class AjaxManager{

	private $params;

	private function setParams(array $params) {

		$this->params = $params;
	}
	
	private function getParams() {

		return $this->params;
	}

	public function __construct($params) {
		
		$this->setParams($params);
	}
	
	public function apply() {
		
		$params = $this->getParams();

		if(!isset($params['route'])) {

			$result = array(
				'message' => 'erreur de configuration'
			);
			return json_encode($result);
		}

		return $this->switchRoute($params['route']);
	}
	
	private function switchRoute($route){
		
		switch($route) {
			
			case 'exemple' :
				$result = array(
					'message' => 'Cas exemple OK !'
				);
				break;

			default :
				$result = array(
					'message' => 'Cas non traité'
				);
				break;
		}
		
		return json_encode($result);
	}
	
}
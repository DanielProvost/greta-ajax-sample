<?php
include_once('lib.php');

$ajaxManager = new AjaxManager($_GET);
print($ajaxManager->apply());

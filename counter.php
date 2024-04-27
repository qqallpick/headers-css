<?php
// 初始化计数器文件  
$counterFile = 'counter.txt';
if (!file_exists($counterFile)) {
    file_put_contents($counterFile, '0');
}

// 读取当前计数  
$currentCount = intval(file_get_contents($counterFile));

// 增加计数  
$newCount = $currentCount + 1;

// 更新计数器文件  
file_put_contents($counterFile, $newCount);

// 返回新的计数（可选，用于在前端显示）  
echo $newCount;
?>
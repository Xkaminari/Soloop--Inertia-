<?php

use App\Models\Product;
use App\Models\Promotion;

function formatNumber(int $number) {
    $integer = floor($number);
    if ($number - $integer > 0) {
        return $number;
    } else {
        return intval($number);
    }
};

function isUpdateProductNecessary(object $udate,object $current) {
    if (
        $udate->productName === $current->productName &&
        $udate->productPrice === $current->productPrice &&
        $udate->productDescription === $current->productDescription &&
        $udate->productQuantity === $current->productQuantity &&
        $udate->productImg === $current->productImg
        )
    {
        return false;
    } 
    else
    {
        return true;
    };
};

function isUpdateProfilNecessary(object $udate,object $current) {
    if (
        $udate->userName === $current->userName &&
        $udate->userAddress === $current->userAddress &&
        $udate->userEmail === $current->userEmail &&
        $udate->userNum === $current->userNum
        )
    {
        return false;
    } 
    else
    {
        return true;
    };
};

function isUpdatePromotionNecessary(object $udate,object $current) {
    if (
        $udate->name === $current->name &&
        $udate->description === $current->description &&
        $udate->dicount_rate === $current->dicount_rate &&
        $udate->start_date === $current->start_date &&
        $udate->end_date === $current->end_date
        )
    {
        return false;
    } 
    else
    {
        return true;
    };
};

function isDateInRange($date, $startDate, $endDate) {
    $dateTimestamp = strtotime($date);
    $startTimestamp = strtotime($startDate);
    $endTimestamp = strtotime($endDate);
    
    return (($dateTimestamp >= $startTimestamp) && ($dateTimestamp <= $endTimestamp));
}
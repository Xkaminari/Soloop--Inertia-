<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;

    public function product()
    {
        return $this->hasOne(Product::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    public function cartItem()
    {
        return $this->belongsTo(CartItem::class);
    }

    public function promotion()
    {
        return $this->hasOne(Promotion::class);
    }
}

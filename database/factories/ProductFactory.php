<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->sentence(3, true),
            'price' => $this->faker->randomNumber(3, false),
            // 'barred_price' => $this->faker->randomNumber(3, false),
            'description' => $this->faker->paragraph(7, true),
            'quantity' => $this->faker->randomNumber(4, false),
            'image' => 'storage/ProductImg/9tHjRD5mGxh5Czdzj5dfnj6xA8qC9D6jtYtfsyeU.jpg',
            'created_at' => now()
        ];
    }
}

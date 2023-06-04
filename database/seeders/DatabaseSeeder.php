<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'chahboun med yassine',
            'user_type' => 'admin',
            'email' => 'chahbounmedyassine@gmail.com',
            'email_verified_at' => now(),
            'phone' => '0649182119',
            'password' => Hash::make('MYCkami89//'),
        ]);
        DB::table('users')->insert([
            'name' => 'random',
            'user_type' => 'client',
            'email' => 'flkaminari@gmail.com',
            'email_verified_at' => now(),
            'phone' => '0660174121',
            'password' => Hash::make('AZERTY2004'),
        ]);
        $this->call([
            UserSeeder::class,
            ProductSeeder::class
        ]);
    }
}

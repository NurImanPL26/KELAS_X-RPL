<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StudentController;

// Authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Admin Routes
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::apiResource('students', StudentController::class);
        // Add other resources like teachers, subjects, announcements here
    });

    // Student Routes
    Route::middleware('role:siswa')->prefix('student')->group(function () {
        Route::get('/dashboard', [StudentController::class, 'dashboard']);
        // Add other student specific routes
    });
});

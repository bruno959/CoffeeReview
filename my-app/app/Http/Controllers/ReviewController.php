<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function create($id)
    {
        $shop = Shop::find($id);
        return  Inertia::render('Review/Create', [
            'shop' => $shop,
        ]);
    }

    // レビューの保存
    public function  store(Request $request)
    {
        $status = 'error';

        $request->validate([
            'rating' => 'required|integer|between:1,5',
            'comment' => 'required|string|max:255',
        ]);

        $reviewModel = new Review();
        $review = $reviewModel->saveReview($request);

        // ステータス
        if ($review) {
            $status = 'review-created';
        }

        return redirect()->route('shop.detail', [
            'id'     => $request->shop_id,
            'status' => $status,
        ]);
    }
}

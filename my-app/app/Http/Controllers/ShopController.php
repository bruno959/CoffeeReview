<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Review;


class ShopController extends Controller
{
    public function index()
    {
        $shops = Shop::with('reviews')->get();

        $newReviews = Review::with('shop', 'user')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('Home', [
            'shops'      => $shops,
            'newReviews' => $newReviews,
        ]);
    }

    public function detail($id)
    {
        $shop = Shop::find($id);

        // クエリパラメーターからステータスを取得
        $status = request('status');

        $reviews = Review::with('user')
            ->where('shop_id', $id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Shop/Detail', [
            'shop'    => $shop,
            'reviews' => $reviews,
            'status'  => $status,
        ]);
    }
}

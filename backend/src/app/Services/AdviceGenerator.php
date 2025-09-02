<?php

namespace App\Services;

use App\Models\MealLog;
use App\Models\Profile;
use Illuminate\Support\Collection;
use OpenAI;

class AdviceGenerator
{
    public function __construct(
        private readonly \OpenAI\Client $client
    ) {}

    /**
     * @param Profile $profile
     * @param Collection<int, MealLog> $logs
     */
    public function generate(Profile $profile, Collection $logs): string
    {
        $logLines = $logs->map(function (MealLog $log) {
            $menus = collect($log->menu ?? [])
                ->map(fn ($m) => ($m['name'] ?? '-') . ' ' . ($m['amount'] ?? ''))
                ->implode('、');

            return sprintf(
                '%s %s / 完食率: %s / メニュー: %s%s',
                $log->date,
                $log->meal_time_note ?: $log->meal_time,
                $log->amount_percent,
                $menus,
                $log->memo ? (' / メモ: ' . $log->memo) : ''
            );
        })->implode("\n");

        $profileLine = sprintf(
            "名前: %s / 体重: %skg / 性別: %s / 誕生日: %s / 犬種: %s / 性格: %s / 多頭飼い: %s",
            $profile->name ?? '不明',
            $profile->weight_kg ?? '不明',
            $profile->gender ?? '不明',
            $profile->birthdate ?? '不明',
            $profile->breed,
            $profile->personality,
            $profile->is_multiple_dogs
        );

        $system = <<<SYS
あなたは犬の給餌と食事行動のアドバイスを行う獣医師アシスタントです。
出力は日本語で、飼い主がすぐ実行できる簡潔な指示を3〜5行でまとめてください。
健康上の懸念があれば過度に断定せず、受診の目安も一文で添えてください。
SYS;

        $user = <<<USR
【ペットプロフィール】
{$profileLine}

【最近の食事ログ（新しい順 最大20件）】
{$logLines}

これらを踏まえて、次の食事に向けた具体的なアドバイスを1つの文章ブロックで出力してください。また、一文ずつ改行してください。
・推奨するメニュー/調理/量の工夫
・食べ始めの誘導や与え方のコツ
・注意点（アレルギーやむせ、下痢・便秘時の対応などがあれば）
・必要なら受診目安（継続する拒食・嘔吐・下痢など）
USR;

        $resp = $this->client->chat()->create([
            'model' => 'gpt-4o-mini',
            'temperature' => 0.7,
            'messages' => [
                ['role' => 'system', 'content' => $system],
                ['role' => 'user', 'content' => $user],
            ],
        ]);

        $content = trim($resp->choices[0]->message->content ?? '');
        return $content !== '' ? $content : '十分なデータが得られなかったため、今は一般的な助言のみとなります。';
    }

    public static function makeFromConfig(): self
    {
        $client = OpenAI::client(config('services.openai.api_key'));
        return new self($client);
    }
}
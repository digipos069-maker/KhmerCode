import React from 'react';
import { UserStats } from '../types';
import { SHOP_ITEMS } from '../data/challenges';
import { soundFx } from '../utils/sound';
import { ShoppingBag, X, Gem, Check, Heart, Award, Sparkles } from 'lucide-react';

interface ShopModalProps {
  isOpen: boolean;
  stats: UserStats;
  onClose: () => void;
  onBuyItem: (itemId: string, itemType: string, costGems: number, itemValue: string) => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({
  isOpen,
  stats,
  onClose,
  onBuyItem,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-2xl relative space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">ហាងលក់ទំនិញ (Game Shop)</h3>
              <p className="text-xs text-slate-400">ទិញអាវតារ ងារ និងបេះដូងជីវិតដោយប្រើត្បូង Gems</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-bold">
              <Gem className="w-4 h-4 fill-cyan-400/20" />
              <span>{stats.gems} Gems</span>
            </div>
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Shop Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1">
          {SHOP_ITEMS.map((item) => {
            const isPurchased = stats.purchasedItems.includes(item.id);
            const canAfford = stats.gems >= item.priceGems;

            return (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl p-2.5 rounded-2xl bg-slate-900 border border-slate-800 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{item.nameKhmer}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                      {item.descriptionKhmer}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-800/80 pt-3">
                  <div className="flex items-center gap-1 text-cyan-300 font-bold text-xs">
                    <Gem className="w-3.5 h-3.5 fill-cyan-400/20" />
                    <span>{item.priceGems} Gems</span>
                  </div>

                  {isPurchased && item.type !== 'heart' ? (
                    <span className="px-3 py-1 rounded-xl bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-800 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> បានទិញ
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        if (canAfford) {
                          soundFx.playGemCollect();
                          onBuyItem(item.id, item.type, item.priceGems, item.value);
                        } else {
                          soundFx.playTestFail();
                        }
                      }}
                      disabled={!canAfford}
                      className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition active:scale-95 ${
                        canAfford
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      ទិញឥឡូវ
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

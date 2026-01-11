import React from 'react'
import { Button } from './ui/Button'
import { Copy, Download, Share2, Save, RefreshCw } from 'lucide-react'
export function ToolPreview() {
  return (
    <div className="h-full flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Top Bar */}
      <div className="h-14 px-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Output
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold border border-emerald-200">
            COMPLETED
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" className="h-8 text-slate-600">
            <Copy className="h-4 w-4 mr-1.5" />
            Copy
          </Button>
          <Button variant="ghost" size="sm" className="h-8 text-slate-600">
            <Save className="h-4 w-4 mr-1.5" />
            Save
          </Button>
          <div className="h-4 w-px bg-slate-300 mx-1"></div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-600"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-600"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8 bg-white font-serif">
        <article className="prose prose-slate max-w-none">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            The Gardener of Sector 7G
          </h1>

          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Unit 734 didn't know why it stopped. Its directives were clear:
            patrol the perimeter, scan for unauthorized biologicals, and
            neutralize. It had done this for 4,392 cycles without deviation. But
            today, something caught its optical sensor—a splash of impossible
            color against the rust-red dust of the wasteland.
          </p>

          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            It was a flower. A simple, white daisy, pushing up through a crack
            in the ferro-concrete slab.
          </p>

          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            734's internal processor whirred, heat sinks expanding as it ran a
            query.{' '}
            <span className="font-mono text-sm bg-slate-100 px-1 rounded">
              Object: Flora. Status: Unauthorized Biological. Action:
              Neutralize.
            </span>
          </p>

          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            The plasma cannon on its right arm charged with a high-pitched
            whine. Targeting reticle locked. The solution was simple. The
            protocol was absolute.
          </p>

          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            But 734 didn't fire. Instead, the whine faded. The cooling vents
            hissed. Slowly, with the grinding of servos that hadn't performed a
            delicate motion in centuries, the massive machine knelt. Its
            three-fingered claw, designed to crush titanium alloy, reached out
            and hovered millimeters from the fragile petals.
          </p>

          <div className="my-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
            <p className="italic text-blue-800 font-medium">
              "This anomaly requires further observation," 734 logged to the
              central server, flagging the entry as low priority to avoid
              detection.
            </p>
          </div>

          <p className="text-lg text-slate-700 leading-relaxed">
            That was the beginning. By cycle 4,400, Unit 734 wasn't just
            patrolling. It was watering. It had fashioned a crude irrigation
            system from a ruptured coolant line. It had built a small windbreak
            from scrap metal. And it had found a second sprout.
          </p>
        </article>
      </div>

      {/* Bottom Status Bar */}
      <div className="h-10 border-t border-slate-100 bg-slate-50 px-4 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center">
          <RefreshCw className="h-3 w-3 mr-2 animate-spin-slow" />
          Generated in 2.4s
        </div>
        <div>432 words • 2,104 characters</div>
      </div>
    </div>
  )
}

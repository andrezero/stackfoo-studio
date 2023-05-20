import cx from 'classnames';
import { FC } from 'preact/compat';

// TODO rename to TempoPanel

import {
    useSignatureStore,
    MAX_SIG_NUM,
    MIN_SIG_NUM,
    SIG_DIV_OPTIONS,
} from '../../stores/signatureStore';
import { useTempoStore, MAX_BPM, MIN_BPM } from '../../stores/tempoStore';
import { useAudioFeedback } from '../../hooks/useAudioFeedback';
import { useMetronome } from '../../hooks/useMetronome';
import { useTempoDetector } from '../../hooks/useTempoDetector';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Panel } from '../../components/Panel';
import { PanelTitle } from '../../components/PanelTitle';
import { Select } from '../../components/Select';

import './MetronomePanel.css';

export const MetronomePanel: FC = () => {
    const { play } = useAudioFeedback();
    const { count, delta, isDetecting, stable, tap } = useTempoDetector();
    const { isOn, isReady, toggle } = useMetronome();
    const { bpm, setBpm } = useTempoStore();
    const { div, num, setDiv, setNum } = useSignatureStore();
    const size = delta && Math.min(Math.abs(delta) * 20, 50);
    const isNegative = delta && delta < 0;

    const handleTap = () => {
        tap();
        play();
    };

    const stabilityClasseNames = cx(
        'Stability',
        stable,
        isNegative ? 'is-slow' : 'is-fast',
        isDetecting ? 'is-detecting' : '',
        count && 'has-count'
    );

    return (
        <Panel className="MetronomePanel" horizontal>
            <PanelTitle label="M">Metronome</PanelTitle>
            <Input
                id="Bpm"
                type="number"
                size="s"
                value={`${bpm}`}
                min={MIN_BPM}
                max={MAX_BPM}
                className="BpmInput"
                onValueChange={(b) => setBpm(Number(b))}
            />
            <label class="PanelLabel" for="bpm">
                BPM
            </label>
            <Input
                id="Num"
                type="number"
                size="s"
                value={`${num}`}
                min={MIN_SIG_NUM}
                max={MAX_SIG_NUM}
                className="NumInput"
                onValueChange={(n) => setNum(Number(n))}
            />
            <span>/</span>
            <Select
                id="Div"
                type="number"
                size="s"
                value={`${div}`}
                className="DivSelect"
                onValueChange={(d) => setDiv(Number(d))}
            >
                {SIG_DIV_OPTIONS.map((option) => (
                    <option value={option}>{option}</option>
                ))}
            </Select>
            <div class="actions">
                <Button
                    className="OnButton"
                    disabled={!isReady}
                    onClick={toggle}
                    active={isOn}
                >
                    {isOn ? 'On' : 'Off'}
                </Button>

                <Button
                    className="TapButton"
                    active={isDetecting}
                    onTap={handleTap} // TODO use onTap
                >
                    Tap
                    <span class={stabilityClasseNames}>
                        {count ? (
                            count
                        ) : (
                            <span style={{ height: `${size}%` }}></span>
                        )}
                    </span>
                </Button>
            </div>
        </Panel>
    );
};

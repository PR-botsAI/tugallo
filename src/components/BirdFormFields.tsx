import { CRESTAS, COLORES } from "@/lib/format";

type BirdDefaults = {
  placa?: string;
  placaPadre?: string | null;
  placaMadre?: string | null;
  sexo?: string;
  color?: string | null;
  cresta?: string | null;
  marcaje?: string | null;
  observaciones?: string | null;
  photoUrl?: string | null;
  lifeStatus?: string;
  deceasedDate?: Date | null;
};

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <div className="mt-1">{children}</div>
      {hint && <span className="mt-1 block text-xs text-brand-slate">{hint}</span>}
    </label>
  );
}

export function BirdFormFields({
  bird,
  placas = [],
}: {
  bird?: BirdDefaults;
  placas?: string[];
}) {
  const deceasedDateValue = bird?.deceasedDate
    ? new Date(bird.deceasedDate).toISOString().slice(0, 10)
    : "";

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Placa No *">
        <input
          name="placa"
          required
          defaultValue={bird?.placa ?? ""}
          className="field"
          placeholder="Ej. 045"
        />
      </Field>

      <Field label="Marcaje No.">
        <input
          name="marcaje"
          defaultValue={bird?.marcaje ?? ""}
          className="field"
        />
      </Field>

      <Field label="Placa del Padre">
        <input
          name="placaPadre"
          list="placas-list"
          defaultValue={bird?.placaPadre ?? ""}
          className="field"
        />
      </Field>

      <Field label="Placa de la Madre">
        <input
          name="placaMadre"
          list="placas-list"
          defaultValue={bird?.placaMadre ?? ""}
          className="field"
        />
      </Field>

      <Field label="Sexo">
        <select name="sexo" defaultValue={bird?.sexo ?? "MALE"} className="field">
          <option value="MALE">Gallo</option>
          <option value="FEMALE">Gallina</option>
        </select>
      </Field>

      <Field label="Color">
        <input
          name="color"
          list="colores-list"
          defaultValue={bird?.color ?? ""}
          className="field"
        />
      </Field>

      <Field label="Cresta">
        <input
          name="cresta"
          list="crestas-list"
          defaultValue={bird?.cresta ?? ""}
          className="field"
        />
      </Field>

      <Field label="Foto (URL)" hint="Opcional. Pega un enlace a una imagen.">
        <input
          name="photoUrl"
          type="url"
          defaultValue={bird?.photoUrl ?? ""}
          className="field"
          placeholder="https://…"
        />
      </Field>

      <Field label="Estado">
        <select
          name="lifeStatus"
          defaultValue={bird?.lifeStatus ?? "LIVING"}
          className="field"
        >
          <option value="LIVING">Vivo</option>
          <option value="DECEASED">Difunto</option>
        </select>
      </Field>

      <Field
        label="Fecha de fallecimiento"
        hint="Solo si está difunto."
      >
        <input
          type="date"
          name="deceasedDate"
          defaultValue={deceasedDateValue}
          className="field"
        />
      </Field>

      <div className="sm:col-span-2">
        <Field label="Observaciones">
          <textarea
            name="observaciones"
            rows={3}
            defaultValue={bird?.observaciones ?? ""}
            className="field resize-y"
          />
        </Field>
      </div>

      {/* Sugerencias de autocompletar */}
      <datalist id="placas-list">
        {placas.map((p) => (
          <option key={p} value={p} />
        ))}
      </datalist>
      <datalist id="colores-list">
        {COLORES.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
      <datalist id="crestas-list">
        {CRESTAS.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
    </div>
  );
}

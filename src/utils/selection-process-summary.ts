import { SelectionProcessList } from "../types/selection-process";

interface ProcessSummary {
    title: string;
    year: string;
    institution: string;
    state: string;
    status: string;
}


export function transformSelectionProcesses(selectionProcesses: SelectionProcessList[] | undefined): ProcessSummary[] {
    if (!selectionProcesses) return [];
    return selectionProcesses.map(proc => {
        const year = proc.openingDate.substring(0, 4);

        return {
            title: proc.name,
            year,
            institution: proc.institution.name,
            state: proc.city?.federateUnit?.name || "",
            status: proc.selectionProcessStatus.description,
        }
    })
}
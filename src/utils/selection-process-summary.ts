import { SelectionProcessList } from "../types/selection-process";
import { Test } from "../types/test-list";

interface ProcessSummary {
    title: string;
    year: string;
    institution: string;
    state: string;
    status: string;
}

interface TestSummary {
    title: string;
    function: string;
    year: string;
}


export function transformSelectionProcesses(selectionProcesses: SelectionProcessList[] | undefined): ProcessSummary[] {
    if (!selectionProcesses) return [];
    return selectionProcesses.map(proc => {
        const year = proc.openingDate.substring(0, 4);
        return {
            idSelectionProcess: proc.id,
            title: proc.name,
            year,
            institution: proc.institution.name,
            state: proc.city?.federateUnit?.name || "",
            status: proc.selectionProcessStatus.description,
        }
    })
}

export function transformTests(tests: Test[] | undefined): TestSummary[] {
    if (!tests) return [];
    return tests.map(proc => {
        const year = proc.applicationDate.substring(0, 4);
        return {
            idTest: proc.id,
            title: proc.name,
            function: proc.function.name,
            year,
        }
    })
}
export class StringUtils {
    public static substitute(source: string, params: any): string {
        return source.replace(
            /\{([^}]*)}/gi,
            (fullMatch: string, shortMatch: string): string => {
                let result: string;
                if (params.hasOwnProperty(shortMatch)) {
                    result = params[shortMatch];
                } else {
                    console.warn(`param with index "${shortMatch}" is not exists in params: [${params.toString()}]`);
                    result = "";
                }
                return result;
            }
        );
    }
}
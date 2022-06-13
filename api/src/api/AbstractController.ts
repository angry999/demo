/**
 * a basic point of inheritence for controllers
 */
export abstract class AbstractController<T>
{
    /**
     * take a filter provided by a url and translate it into a filter usable by the Dal's
     * @param urlFilter - the filter to translate. in general this means the operators that are crucial to html syntax get adjusted
     * @returns a filter that can be passed to Dal's
     */
    translateFilter(urlFilter: string): string {
        if (urlFilter == null)
            return null;

        // is it just string replace? is this really all there is?
        let sqlFilter = urlFilter.replace(/\s[Ee][Qq]\s/g, "=")
            .replace(/\s[Nn][Ee]\s/g, "<>")
            .replace(/\s[Gg][ee]\s/g, ">=")
            .replace(/\s[Gg][Tt]\s/g, ">")
            .replace(/\s[Ll][Ee]\s/g, "<=")
            .replace(/\s[Ll][Tt]\s/g, "<");
        return sqlFilter;
    }

    /**
     * take a csv string (given in a url) and convert it into an array
     * @param param - the filter that needs to be converted into an array
     * @returns an array of strings or null if the parameter was not specified
     */
    csvParamToArray(param: string): string[] {
        return (param == null) ? null : param.trim().split(',');
    }
}

import { toOption } from "@/lib/converters";
import type { Option } from "@/types/option";

/**
 * This is a work in progress and likely a repository class can instead be used
 * for some of this functionality.
 */
export abstract class BaseService<T, TBrief, TBriefData, TDelegate, TSelect, TOrderByWithRelationInput> {

  public abstract getDelegate(): TDelegate;

  public async findAll(brief?: boolean): Promise<T[] | TBrief[]> {
    const items: any[] = await this.getDelegate().findMany({
      select:  (brief)
        ? this.getBriefSelectColumns()
        : this.getSelectColumns(),
      orderBy: this.getOrderByColumns(),
    });

    return (brief)
      ? this.mapBriefItems(items)
      : this.mapItems(items);
  }

  public async findById(id: number, brief?: boolean): Promise<T | TBrief> {
    const item: any = await this.getDelegate().findUniqueOrThrow({
      select: (brief)
        ? this.getBriefSelectColumns()
        : this.getSelectColumns(),
      where:  { id },
    });

    return (brief)
      ? this.toBriefItem(item)
      : this.toItem(item);
  }

  public async save(data: TBriefData): Promise<TBrief> {
    const { activated, ...saveData } = data;

    const item: any = await this.getDelegate().create({
      data: { ...saveData, active: activated }, /* temp: transform structure */
    });

    return this.findById(item.id, true);
  }

  public async saveById(id: number, data: TBriefData): Promise<TBrief> {
    const { activated, ...saveData } = data;

    const item: any = await this.getDelegate().update({
      data: { ...saveData, active: activated }, /* temp: transform structure */
      where: { id },
    });

    return this.findById(item.id, true);
  }

  public async findOptions(): Promise<Option[]> {
    const items: any[] = this.getDelegate().findMany({
      select:  { id: true, name: true },
      orderBy: this.getOrderByColumns(),
    });

    return this.mapOptions(items);
  }

  protected abstract toItem(data: any): T;

  protected mapItems(items: any[]): T[] {
    return items
      .map((item) => this.toItem(item));
  }

  protected abstract toBriefItem(data: any): TBrief;

  protected mapBriefItems(items: any[]): TBrief[] {
    return items
      .map((item) => this.toBriefItem(item));
  }

  protected toOption(item: any): Option {
    return toOption(item);
  }

  protected mapOptions(items: any[]): Option[] {
    return items
      .map((item) => this.toOption(item));
  }

  protected abstract getSelectColumns(): TSelect;

  protected abstract getBriefSelectColumns(): TSelect;

  protected abstract getOrderByColumns(): TOrderByWithRelationInput;

}
